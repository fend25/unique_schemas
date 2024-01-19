export type LocalizedStringWithDefault = {
  _: string
  [K: string]: string
}

export type AttributeValue = LocalizedStringWithDefault & {order?: number}
export type AttributeValues = AttributeValue[]

export type TokenPropertyPermissionValue = {
  mutable: boolean
  collectionAdmin: boolean
  tokenOwner: boolean
}
export type Property = {
  key: string
  value: string
}
export type TokenPropertyPermission = {
  key: string
  permission: TokenPropertyPermissionValue
}

enum AttributeType {
  integer = 'integer',        // number
  float = 'float',            // number
  boolean = 'boolean',        // number
  timestamp = 'timestamp',    // number // js, milliseconds from epoch
  string = 'string',          // string
  url = 'url',                // string
  isoDate = 'isoDate',        // string // ISO Date: YYYY-MM-DD
  time = 'time',              // string // 24h time: HH:mm:ss
  colorRgba = 'colorRgba',    // string // 'rrggbbaa'
  colorLch = 'colorLch',      // string // '52.2345% 72.2 56.2 / .5'
}

export type TokenMediaType = 'image' | 'video' | 'audio' | '3d' | 'file' | 'link'
export type SubType =
  'youtube'
  | 'vimeo'
  | 'soundcloud'
  | 'spotify'
  | 'deezer'
  | 'tiktok'
  | 'instagram'
  | 'twitter'
  | 'facebook'
  | 'twitch'
  | 'dailymotion'
  | 'mixcloud'
  | 'figma'

export type TokenMediaInfo = {
  type: TokenMediaType
  subType?: SubType
  title?: LocalizedStringWithDefault
  order?: number
  main?: boolean
  mimeType?: string
  loop?: boolean
  posterFor?: string
}

export type TokenMediaInfoWithUrl = Omit<TokenMediaInfo, 'type'> & {
  type?: TokenMediaType
  url?: string
  suffix?: string
}

export type ImageItem = Pick<TokenMediaInfoWithUrl, 'title' | 'mimeType' | 'loop' | 'url' | 'suffix'>

type AttributeBaseSchema = {
  type: keyof typeof AttributeType // or just make the type `string` and that's all?
  title: LocalizedStringWithDefault
  order?: number // to sort attrs
  single?: boolean // if true, then only one value is allowed, otherwise multiple values are allowed
}

export type RoyaltyKind = {
  addresses: {
    [K: string]: number // address: percent with decimals [4], i. e. 1000000 = 100% or 10000 = 1%
  }
}

export type RoyaltySchema = {
  royaltyVersion: number // 1
  decimals?: number // DEFAULT_ROYALTIES_DECIMALS - 4
  primary?: RoyaltyKind
  secondary?: RoyaltyKind
}

export type AttributeSchemaInCollection = AttributeBaseSchema & {
  optional?: boolean
  enumValues?: { [K: string]: LocalizedStringWithDefault & {order?: number}}
  permission?: TokenPropertyPermissionValue
}

export type MediaSchemaInCollection = TokenMediaInfo & {
  required?: boolean
  permission?: TokenPropertyPermissionValue
}

export type UniqueCollectionSchemaV2 = {
  schemaName: string // 'unique'
  schemaVersion: string // '2.x.x'

  baseUrl: string
  ipfsGateways?: string[]
  defaultLocale?: string

  instantiateWith?: {
    defaultPermission?: TokenPropertyPermissionValue
    propertyCommonPermission?: TokenPropertyPermissionValue,
    allowERC721MetadataTokenURI?: boolean | TokenPropertyPermissionValue
  }

  // additional field to add a free form information to the collection
  // without generic knowledge how to read this info for wallets
  info?: any

  cover: ImageItem

  media?: {
    permission?: TokenPropertyPermissionValue
    schema: {
      [K: string]: MediaSchemaInCollection
    }
  }

  attributes?: {
    permission?: TokenPropertyPermissionValue
    schema: {
      [K: string]: AttributeSchemaInCollection
    }
  }

  // actually a fallback for token royalties. default for a collection
  royalties?: RoyaltySchema & {
    permission?: TokenPropertyPermissionValue
  }
}

export type UniqueCollectionSchemaV2InCollection = Omit<UniqueCollectionSchemaV2, 'schemaName' | 'schemaVersion'> & {
  schemaName?: string
  schemaVersion?: string
}

type TokenCommonData = {
  preview?: ImageItem

  defaultLocale?: string

  name?: LocalizedStringWithDefault
  description?: LocalizedStringWithDefault

  mediaFallback?: { [K: string]: TokenMediaInfoWithUrl }

  info?: any // this field is needed for some free form data about the token
  ERC721MetadataTokenURI?: string
}

export type SchemaBasedAttributeInToken = {
  enumKeys?: string[]
  values?: AttributeValues
}

export type DynamicAttributeInToken = AttributeBaseSchema & {
  values: AttributeValues
}

export type TokenAttributeItem = SchemaBasedAttributeInToken | DynamicAttributeInToken

export type UniqueTokenV2 = {
  common?: TokenCommonData
  media?: { [K: string]: TokenMediaInfoWithUrl }
  royalties?: RoyaltySchema
  attributes?: { [K: string]: TokenAttributeItem }
}

////////////////////////////////////
// enriched types
////////////////////////////////////

export type TokenMediaInfoEnriched = TokenMediaInfo & {
  url: string
  suffix?: string
}

export type TokenAttributeItemEnriched = AttributeBaseSchema & {
  values: AttributeValues
  enumKeys?: string[]
}

export type UniqueTokenV2Enriched = UniqueTokenV2 & {
  common?: TokenCommonData & {
    mediaFallback?: { [K: string]: TokenMediaInfoEnriched }
  }
  preview?: ImageItem
  media?: { [K: string]: TokenMediaInfoEnriched }
  attributes?: { [K: string]:  TokenAttributeItemEnriched}
}