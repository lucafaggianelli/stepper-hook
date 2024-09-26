import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

// https://astro.build/config
export default defineConfig({
  site: 'https://lucafaggianelli.com',
  base: '/stepper-hook',
  integrations: [
    starlight({
      title: 'stepper-hook',
      social: {
        github: 'https://github.com/lucafaggianelli/stepper-hook',
      },
      // sidebar: [
      // {
      // 	label: 'Guides',
      // 	items: [
      // 		// Each item here is one entry in the navigation menu.
      // 		{ label: 'Example Guide', slug: 'guides/example' },
      // 	],
      // },
      // {
      // 	label: 'Reference',
      // 	autogenerate: { directory: 'reference' },
      // },
      // ],
    }),
  ],
})
