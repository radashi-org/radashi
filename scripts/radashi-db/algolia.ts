import createAlgolia from 'algoliasearch'

/* cSpell:disable-next-line */
const appId = '7YYOXVJ9K7'
export const algolia = createAlgolia(appId, process.env.ALGOLIA_KEY!)
