import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

const isProduction = process.env.NODE_ENV === "production";

// https://astro.build/config
export default defineConfig({
	base: isProduction ? "/software-concepts-journal" : undefined,
  	site: isProduction
		? "https://b1z3rr4.github.io/software-concepts-journal"
		: undefined,
	integrations: [
		starlight({
			title: 'Design Patterns',
			social: {
				github: 'https://b1z3rr4.github.io/software-concepts-journal',
			},
			sidebar: [
				{
					label: 'Comece Aqui',
					items: [
						{ label: 'Introdução', slug: 'introduction/guide' },
						{ label: 'Como Contribuir', slug: 'introduction/contribute' },
						{ label: 'Como Estudar os Exemplos', slug: 'introduction/study' },
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
