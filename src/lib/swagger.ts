import 'dotenv/config'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.3',
        info: {
            title: 'Feaktion API',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'localhost:' + process.env.PORT || '3000',
                description: 'local server'
            },
            {
                url: 'feaktionapi.epiclogue.com',
                description: 'dev server'
            }
        ],
        basePath: '/',
        schemes: ['https', 'http'],
        components: {
            securitySchemes: {
                jwt: {
                    type: 'apikey',
                    name: 'jwt',
                    in: 'cookie'
                }
            }
        },
        security: [
            { 
                jwt: []
            }
        ],
        tags: [
            {
                name: 'user'
            },
            {
                name: 'feaktion'
            },
            {
                name: 'episode'
            },
            {
                name: 'comment'
            }
        ]
    },
    // api 파일 경로는 항상 프로젝트 루트를 기준으로 할 것
    apis: [
        './src/apis/**/routes/*Router.ts',
        './src/swagger/*.yaml'
    ]
}

export const doc = swaggerJSDoc(options)

export default swaggerUi