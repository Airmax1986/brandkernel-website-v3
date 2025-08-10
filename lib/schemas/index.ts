// Schema exports
export { softwareApplicationSchema } from './software-application'
export { websiteSchema } from './website'
export { organizationSchema } from './organization'
export { faqSchema } from './faq'
export { productSchema } from './product'

// Helper to combine multiple schemas using @graph
export const combineSchemas = (...schemas: object[]) => {
  return {
    "@context": "https://schema.org",
    "@graph": schemas.filter(Boolean) // Remove any undefined schemas
  }
}

// Page-specific schema combinations
export const getHomePageSchemas = () => combineSchemas(
  require('./website').websiteSchema,
  require('./organization').organizationSchema,
  require('./software-application').softwareApplicationSchema,
  require('./faq').faqSchema
)

export const getPricingPageSchemas = () => combineSchemas(
  require('./website').websiteSchema,
  require('./organization').organizationSchema, 
  require('./product').productSchema
)

export const getFeaturesPageSchemas = () => combineSchemas(
  require('./website').websiteSchema,
  require('./organization').organizationSchema,
  require('./software-application').softwareApplicationSchema
)

// Schema injection helper for Next.js
export const injectSchema = (schema: object) => ({
  __html: JSON.stringify(schema, null, 0)
})

// Validation helper
export const validateSchema = (schema: object): boolean => {
  try {
    const schemaString = JSON.stringify(schema)
    return schemaString.includes('"@context"') && schemaString.includes('"@type"')
  } catch {
    return false
  }
}