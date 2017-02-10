#version 150

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_bounds;
uniform vec2 u_mouse;
uniform float u_time;

out vec4 outputColor;

#define PI 3.14159265359

float plot (vec2 st, float pct) {
    return smoothstep( pct-0.02, pct, st.y) - smoothstep( pct, pct+0.02, st.y);
}

//  Function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(1.0), rgb, c.y);
}

float expStep(float x, float k, float n) {
    return exp(-k * pow(x,n) );
}


vec2 xy = gl_FragCoord.xy;
vec2 norm_point = gl_FragCoord.xy/u_bounds;

void main() {
    float x = norm_point.x;
    float y = norm_point.y;
    vec3 color = vec3(0.0);

    // Use polar coordinates instead of cartesian
    vec2 toCenter = vec2(.5) - norm_point;
    float angle = atan(toCenter.y,toCenter.x);
    float radius = length(toCenter) * 2.;

    // Map the angle (-PI to PI) to the Hue (from 0 to 1)
    // and the Saturation to the radius
    // Use a shaping function to

    float norm_angle = (angle/(PI * 2.)) + 0.5;
    color = hsb2rgb(vec3(norm_angle, radius, 1.0));
    color = mix(color, vec3(1.0,0.0,0.0), plot(norm_point, angle));

    outputColor = vec4(color,1.0);
}
