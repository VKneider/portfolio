import fs from 'fs/promises';
import path from 'path';

export default async function discoverThemes() {
    const themesDir = path.join(process.cwd(), 'src', 'Themes');

    try {
        await fs.access(themesDir);

        const files = await fs.readdir(themesDir);
        const cssFiles = files.filter(f => f.toLowerCase().endsWith('.css'));

        // Extrae los tokens canónicos --accent (cálido de marca) y --bg (canvas)
        // del manual vkneider.dev §3 Sección 1 para alimentar el ThemeSelector.
        const tasks = cssFiles.map(async (file) => {
            const filePath = path.join(themesDir, file);
            const content = await fs.readFile(filePath, 'utf-8');

            const accentMatch = content.match(/--accent\s*:\s*([^;]+)/i);
            const bgMatch     = content.match(/--bg\s*:\s*([^;]+)/i);

            if (accentMatch && bgMatch) {
                return {
                    name: path.basename(file, path.extname(file)),
                    colors: {
                        primary: accentMatch[1].trim(),
                        secondary: bgMatch[1].trim()
                    }
                };
            }
            return null;
        });

        const results = await Promise.all(tasks);
        return results.filter(theme => theme !== null);

    } catch (error) {
        console.error("Error leyendo temas:", error.message);
        return [];
    }
}
