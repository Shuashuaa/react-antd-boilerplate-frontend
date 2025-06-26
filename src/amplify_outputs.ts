const amplifyOutputs = {
  auth: {
    user_pool_id: import.meta.env.VITE_USER_POOL_ID,
    aws_region: import.meta.env.VITE_AWS_REGION,
    user_pool_client_id: import.meta.env.VITE_USER_POOL_CLIENT_ID,
    identity_pool_id: import.meta.env.VITE_IDENTITY_POOL_ID,
    mfa_methods: [] as string[],
    standard_required_attributes: ["email"],
    username_attributes: ["email"],
    user_verification_types: ["email"],
    groups: [] as string[],
    mfa_configuration: "NONE",
    password_policy: {
      min_length: 8,
      require_lowercase: true,
      require_numbers: true,
      require_symbols: true,
      require_uppercase: true
    },
    unauthenticated_identities_enabled: true
  },
  data: {
    url: import.meta.env.VITE_APPSYNC_URL,
    aws_region: import.meta.env.VITE_APPSYNC_REGION,
    default_authorization_type: import.meta.env.VITE_APPSYNC_AUTH_TYPE,
    authorization_types: [import.meta.env.VITE_APPSYNC_ALT_AUTH_TYPE],
    model_introspection: {
      version: 1,
      models: {
        Todo: {
          name: "Todo",
          fields: {
            id: {
              name: "id",
              isArray: false,
              type: "ID",
              isRequired: true,
              attributes: []
            },
            content: {
              name: "content",
              isArray: false,
              type: "String",
              isRequired: false,
              attributes: []
            },
            createdAt: {
              name: "createdAt",
              isArray: false,
              type: "AWSDateTime",
              isRequired: false,
              attributes: [],
              isReadOnly: true
            },
            updatedAt: {
              name: "updatedAt",
              isArray: false,
              type: "AWSDateTime",
              isRequired: false,
              attributes: [],
              isReadOnly: true
            }
          },
          syncable: true,
          pluralName: "Todos",
          attributes: [
            {
              type: "model",
              properties: {}
            },
            {
              type: "auth",
              properties: {
                rules: [
                  {
                    allow: "public",
                    provider: "iam",
                    operations: ["create", "update", "delete", "read"]
                  }
                ]
              }
            }
          ],
          primaryKeyInfo: {
            isCustomPrimaryKey: false,
            primaryKeyFieldName: "id",
            sortKeyFieldNames: []
          }
        }
      },
      enums: {},
      nonModels: {}
    }
  },
  version: "1.3"
};

export default amplifyOutputs;
