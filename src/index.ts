export * from './types'
import * as types from './types'
import * as validators from './tools/validators'
import * as collection from './tools/collection'
import * as token from './tools/token'
import * as oldSchema from './tools/oldSchemaDecoder'
import * as universal from './tools/universal'

export const SchemaTools = {
  decode: {
    collectionSchema: universal.universallyDecodeCollectionSchemaV0OrV1ToIntermediateRepresentation,
    token: universal.universallyDecodeTokenV0OrV1ToIntermediateRepresentation
  },
  encodeUnique: {
    collectionSchema: collection.encodeCollectionSchemaToProperties,
    collectionTokenPropertyPermissions: collection.generateTokenPropertyPermissionsFromCollectionSchema,
    token: token.encodeTokenToProperties,
  },
  tools: {
    unique: {
      collection,
      token,
      validators,
    },
    oldSchema,
    universal,
  },
  types,
}
