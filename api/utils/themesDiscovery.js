import fs from 'fs/promises';
import path from 'path';

export default async function discoverThemes() {
    const themesDir = path.join(process.cwd(), 'src', 'Themes');
    const themes = [];

    try {
        // Verificamos acceso al directorio
        await fs.access(themesDir);
        
        const files = await fs.readdir(themesDir);
        const cssFiles = files.filter(f => f.toLowerCase().endsWith('.css'));

        // Procesamos en paralelo para mayor velocidad
        const tasks = cssFiles.map(async (file) => {
            const filePath = path.join(themesDir, file);
            const content = await fs.readFile(filePath, 'utf-8');

            // Regex mejorada: permite espacios flexibles y es insensible a mayúsculas
            const primaryMatch = content.match(/--primary-color\s*:\s*([^;]+)/i);
            const secondaryMatch = content.match(/--primary-background-color\s*:\s*([^;]+)/i);

        
            


            if (primaryMatch && secondaryMatch) {
                return {
                    name: path.basename(file, path.extname(file)),
                    colors: {
                        primary: primaryMatch[1].trim(),
                        secondary: secondaryMatch[1].trim()
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