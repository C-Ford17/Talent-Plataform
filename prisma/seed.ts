import { PrismaClient, SkillCategory } from "@prisma/client";

const prisma = new PrismaClient();

const skills = [
  // Habilidades Técnicas
  {
    name: "JavaScript",
    category: SkillCategory.TECHNICAL,
    description: "Lenguaje de programación para desarrollo web",
  },
  {
    name: "Python",
    category: SkillCategory.TECHNICAL,
    description: "Lenguaje de programación versátil",
  },
  {
    name: "React",
    category: SkillCategory.TECHNICAL,
    description: "Biblioteca JavaScript para interfaces de usuario",
  },
  {
    name: "Next.js",
    category: SkillCategory.TECHNICAL,
    description: "Framework React para aplicaciones web",
  },
  {
    name: "Node.js",
    category: SkillCategory.TECHNICAL,
    description: "Entorno de ejecución JavaScript del lado del servidor",
  },
  {
    name: "SQL",
    category: SkillCategory.TECHNICAL,
    description: "Lenguaje para gestión de bases de datos relacionales",
  },
  {
    name: "Git",
    category: SkillCategory.TECHNICAL,
    description: "Sistema de control de versiones",
  },
  {
    name: "TypeScript",
    category: SkillCategory.TECHNICAL,
    description: "Superset tipado de JavaScript",
  },
  
  // Soft Skills
  {
    name: "Comunicación efectiva",
    category: SkillCategory.SOFT_SKILLS,
    description: "Capacidad de transmitir ideas claramente",
  },
  {
    name: "Trabajo en equipo",
    category: SkillCategory.SOFT_SKILLS,
    description: "Colaboración efectiva con otros",
  },
  {
    name: "Liderazgo",
    category: SkillCategory.SOFT_SKILLS,
    description: "Capacidad de guiar y motivar equipos",
  },
  {
    name: "Resolución de problemas",
    category: SkillCategory.SOFT_SKILLS,
    description: "Análisis y solución de desafíos complejos",
  },
  {
    name: "Pensamiento crítico",
    category: SkillCategory.SOFT_SKILLS,
    description: "Análisis objetivo de información",
  },
  {
    name: "Adaptabilidad",
    category: SkillCategory.SOFT_SKILLS,
    description: "Flexibilidad ante cambios",
  },
  
  // Idiomas
  {
    name: "Inglés",
    category: SkillCategory.LANGUAGE,
    description: "Idioma inglés",
  },
  {
    name: "Español",
    category: SkillCategory.LANGUAGE,
    description: "Idioma español",
  },
  {
    name: "Francés",
    category: SkillCategory.LANGUAGE,
    description: "Idioma francés",
  },
  {
    name: "Portugués",
    category: SkillCategory.LANGUAGE,
    description: "Idioma portugués",
  },
  
  // Herramientas
  {
    name: "Microsoft Excel",
    category: SkillCategory.TOOLS,
    description: "Hoja de cálculo para análisis de datos",
  },
  {
    name: "Figma",
    category: SkillCategory.TOOLS,
    description: "Herramienta de diseño UI/UX",
  },
  {
    name: "Adobe Photoshop",
    category: SkillCategory.TOOLS,
    description: "Software de edición de imágenes",
  },
  {
    name: "Jira",
    category: SkillCategory.TOOLS,
    description: "Herramienta de gestión de proyectos",
  },
  {
    name: "Slack",
    category: SkillCategory.TOOLS,
    description: "Plataforma de comunicación empresarial",
  },
  
  // Conocimientos de Industria
  {
    name: "Marketing Digital",
    category: SkillCategory.INDUSTRY,
    description: "Estrategias de marketing en medios digitales",
  },
  {
    name: "Gestión de Proyectos",
    category: SkillCategory.INDUSTRY,
    description: "Planificación y ejecución de proyectos",
  },
  {
    name: "Atención al Cliente",
    category: SkillCategory.INDUSTRY,
    description: "Servicio y soporte a clientes",
  },
  {
    name: "Contabilidad",
    category: SkillCategory.INDUSTRY,
    description: "Gestión financiera y registros contables",
  },
  {
    name: "Recursos Humanos",
    category: SkillCategory.INDUSTRY,
    description: "Gestión del talento humano",
  },
];

async function main() {
  console.log("🌱 Iniciando seed de habilidades...");

  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { name: skill.name },
      update: {},
      create: skill,
    });
  }

  console.log("✅ Seed completado. Se crearon", skills.length, "habilidades.");
}

main()
  .catch((e) => {
    console.error("❌ Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
