export let CelFS = `
    precision mediump float;
                    
    varying vec4 vColor;

    vec3 uEyePosition = vec3(0.0, 0.0, 0.0);
    vec3 uLightPosition = vec3(3., 1., 3.);
    vec3 uLightAmbient = vec3(1, 1, 1);
    vec3 uLightDiffuse = vec3(1, 1, 1);
    vec3 uLightSpecular = vec3(1, 1, 1);
    // vec3 uAmbient = vec3(0.1, 0.25, 0.1);
    // vec3 uDiffuse = vec3(0.5, 0.8, 0);
    // vec3 uSpecular = vec3(0.3, 0.3, 0.3);
    vec3 uAmbient = vec3(0,0,0);
    vec3 uDiffuse = vec3(0,0,0);
    vec3 uSpecular = vec3(0,0,0);

    float uShininess = 128.0;
    float uTones = 4.0;
    float uSpecularTones = 2.0;           
  
    // geometry properties
    varying vec3 vPosition; 
    varying vec3 vNormal; 
    
    void main(void) {
            
        uAmbient = vec3( vColor );
        uDiffuse = vec3( vColor );
        uSpecular = vec3( vColor );

        // ambient term
        vec3 ambient = uAmbient * uLightAmbient; 
                
        // diffuse term
        vec3 normal = normalize(vNormal); 
        vec3 light = normalize(uLightPosition - vPosition);
        float lambert = max(0.0, dot(normal,light));
        float tone = floor(lambert * uTones);
        lambert = tone / uTones;
        vec3 diffuse = uDiffuse * uLightDiffuse * lambert;
                
        // specular term
        vec3 eye = normalize(uEyePosition - vPosition);
        vec3 halfVec = normalize(light + eye);
        float highlight = pow(max(0.0, dot(normal, halfVec)),uShininess);
        tone = floor(highlight * uSpecularTones);
        highlight = tone / uSpecularTones;
        vec3 specular = uSpecular * uLightSpecular * highlight;
                
        // combine to find lit color
        vec3 litColor = ambient + diffuse + specular; 
        
        gl_FragColor = vec4(litColor, 1.0);
        
    }
`





