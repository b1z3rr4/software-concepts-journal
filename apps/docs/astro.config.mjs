import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	base: "/software-concepts-journal",
  	site: "https://b1z3rr4.github.io/software-concepts-journal/",
	integrations: [
		starlight({
			title: 'Design Patterns',
			social: {
				github: 'https://github.com/b1z3rr4/software-concepts-journal',
			},
			sidebar: [
				{
					label: 'Comece Aqui',
					items: [
						{ label: 'Introdução', slug: 'guide/guide' },
						{ label: 'Como Contribuir', slug: 'guide/contribute' },
						{ label: 'Como Estudar os Exemplos', slug: 'guide/study' },
					],
				},
				{
					label: 'Design Patterns',
					items: [
						{ label: 'Introdução', slug: 'design-patterns/overview' },
						{ label: 'Padrões Criacioinais', slug: 'design-patterns/creational' },
						{ label: 'Padrões Estruturais', slug: 'design-patterns/structural' },
						{ label: 'Padrões Comportamentais', slug: 'design-patterns/behavioral' },
						{ label: 'Boas Práticas', slug: 'design-patterns/others' },
						{ label: 'Heurísticas de Uncle Bob', slug: 'design-patterns/heuristics' },
					],
				},
				{
					label: 'SOLID', 
					items: [
						{ label: 'Introdução', slug: 'solid/overview' },
						{ label: 'Príncipio da Responsábilidade Única', slug: 'solid/srp' },
						{ label: 'Prícipio Aberto/Fechado', slug: 'solid/ocp' },
					]
				}
			],
		}),
	],
});
