export let CelVS = `
    attribute vec3 aPosition;
    attribute vec3 aNormal;

    uniform mat4 uPMatrix;
    uniform mat4 uMVMatrix;
    uniform mat3 uNMatrix;
    uniform sampler2D uSamplerShadow;

    // uLightSpaceMatrix * vec4(vVertex, 1.0);

    uniform vec4 uColor;
    varying vec4 vColor;
    varying vec3 vPosition;
    varying vec3 vNormal;
                
    // Ambient light.
    uniform vec3 ambientLight;

    // Pointlights.
    const int MAX_LIGHT_SOURCES = 8;
    struct LightSource {
        bool isOn;
        vec3 position;
        vec3 color;
    };
    uniform LightSource light[MAX_LIGHT_SOURCES];

    void main(){
        // Calculate vertex position in eye coordinates. 
        vec4 tPosition = uMVMatrix * vec4(aPosition, 1.0);
        // Calculate projektion.
        gl_Position = uPMatrix * tPosition;

        vec3 tNormal = normalize(uNMatrix * aNormal);
        
        // Calculate view vector.
        vec3 v = normalize(-tPosition.xyz);	
                        
        // vColor = fragmentColor;
        // vColor = vec4( toon(tPosition.xyz, tNormal, v), 1.0);
        vColor = uColor;
        vPosition = aPosition;
        vNormal = aNormal;
    }
`

// float ambient = 0.1;
// vec3 normal = normalize(vNormal);
// vec3 lightDir = normalize(uLightPos - vVertex);
// float diffuse = max(dot(normal, lightDir), 0.0);
// float specularStrength = 0.5;
// vec3 viewDir = normalize(uViewPos - vVertex);
// vec3 reflectDir = reflect(-lightDir, normal);
// float specular = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
// float shadow = ShadowCalculation(vVertexLightPos);
// float lightIntensity = (ambient + (1.0 - shadow) *  diffuse + specular);
// if(uActivateCel){
//     lightIntensity = ceil(lightIntensity*uNumberCel)/uNumberCel;
// }
// vec3 color = uCelColor * uLightColor * lightIntensity;
// gl_FragColor = vec4(color, 1.0);