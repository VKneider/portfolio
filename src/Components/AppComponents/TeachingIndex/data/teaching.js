export const teachingData = {
  courses: [
    {
      slug: "pr2",
      name: "Programming 2",
      code: "",
      institution: "Rafael Urdaneta University (URU)",
      description: "Structured and object-oriented programming in C++: modularization, text and binary file handling, and application design with separation between logic and presentation.",
      repo: "https://github.com/VKneider/URU-Prog2",
      units: [
        {
          title: "Modularization and Libraries",
          topics: [
            { title: "Functions and parameter passing" },
            { title: "File separation: .h and .cpp" },
            { title: "Custom libraries" },
            { title: "Separation between logic and presentation" }
          ]
        },
        {
          title: "Composite Data Types",
          topics: [
            { title: "Structures (struct)" },
            { title: "Arrays of structures" },
            { title: "Functions returning entities" },
            { title: "Memory, sizeof and padding" }
          ]
        },
        {
          title: "Text Files",
          topics: [
            { title: "Input and output streams (fstream)" },
            { title: "Reading and parsing CSV" },
            { title: "Validation of invalid records" }
          ]
        },
        {
          title: "Binary Files",
          topics: [
            { title: "Structure serialization" },
            { title: "Random access with seekg and seekp" },
            { title: "In-place record modification" }
          ]
        },
        {
          title: "Object-Oriented Programming",
          topics: [
            { title: "Classes and objects" },
            { title: "Encapsulation, constructors and methods" },
            { title: "OOP principles" },
            { title: "Object persistence in binary files" }
          ]
        },
        {
          title: "Data Structures",
          topics: [
            { title: "Pointers and dynamic memory" },
            { title: "Linked lists" },
            { title: "Stacks and queues" }
          ]
        }
      ]
    },
    {
      slug: "clientes-web",
      name: "Client-Side Web Development",
      code: "",
      institution: "Rafael Urdaneta University (URU)",
      description: "Client-side web development with HTML, CSS and JavaScript without frameworks: from how the web works to applications with external APIs, native components and browser persistence.",
      repo: "https://github.com/VKneider/URU-LenguajeClientesWeb",
      units: [
        {
          title: "Web Fundamentals",
          topics: [
            { title: "Client-server model" },
            { title: "URL anatomy" },
            { title: "HTTP protocol: methods and status codes" },
            { title: "Frontend and backend" }
          ]
        },
        {
          title: "HTML and CSS",
          topics: [
            { title: "HTML structure and semantics" },
            { title: "Forms" },
            { title: "Selectors, cascade and specificity" },
            { title: "Layout with Flexbox and Grid" },
            { title: "Responsive design" }
          ]
        },
        {
          title: "JavaScript and the DOM",
          topics: [
            { title: "Language fundamentals" },
            { title: "DOM manipulation" },
            { title: "Events" },
            { title: "Client-side validation" },
            { title: "State management" }
          ]
        },
        {
          title: "Asynchronicity and APIs",
          topics: [
            { title: "Promises and async/await" },
            { title: "Fetch and REST API consumption" },
            { title: "Parallel requests and partial failures" },
            { title: "In-memory caching" }
          ]
        },
        {
          title: "Components and Single Page Applications",
          topics: [
            { title: "Classes in JavaScript" },
            { title: "ES Modules" },
            { title: "Custom Elements" },
            { title: "Navigation between views in a SPA" }
          ]
        },
        {
          title: "Persistence and Visualization",
          topics: [
            { title: "LocalStorage" },
            { title: "IndexedDB and transactions" },
            { title: "Client-side modeling of related entities" },
            { title: "Charts with Chart.js" }
          ]
        }
      ]
    },
    {
      slug: "components",
      name: "Component-Based Programming",
      code: "252T60",
      institution: "Rafael Urdaneta University (URU)",
      description: "Tenth-semester elective on component-based frontend architecture: frameworks, communication patterns, design systems and design patterns applied to components.",
      units: [
        {
          title: "Unit I · Component Fundamentals",
          topics: [
            { title: "What is a component and why componentize" },
            { title: "Web Components and the platform standard" },
            { title: "Component lifecycle" }
          ]
        },
        {
          title: "Unit II · Component-Based Frameworks",
          topics: [
            { title: "Slice.js: a component-based framework case study" },
            { title: "Component communication: Props, Context and Event Bus" },
            { title: "Router, themes and global managers" },
            { title: "Design Systems" }
          ]
        },
        {
          title: "Unit III · Component Design Patterns",
          topics: [
            { title: "Atomic Design" },
            { title: "Compound Components and Headless Components" },
            { title: "Strategy, Factory and Observer" },
            { title: "Repository and Middleware" },
            { title: "Case study: the Logger project" }
          ]
        },
        {
          title: "Unit IV · Application Architecture and Component Packages",
          topics: [
            { title: "Designing componentized architectures" },
            { title: "Justifying and defending design decisions" },
            { title: "Integration with external APIs" },
            { title: "Packaging and publishing reusable components" },
            { title: "Semantic versioning and release management" },
            { title: "Component package maintenance and backward compatibility" }
          ]
        },
        {
          title: "Unit V · Component Testing and Documentation",
          topics: [
            { title: "Unit testing for components" },
            { title: "Integration testing between components" },
            { title: "End-to-end (E2E) testing" },
            { title: "Storybook integration for component development and documentation" }
          ]
        }
      ]
    }
  ]
};
