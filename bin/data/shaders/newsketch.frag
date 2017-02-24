#version 150

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_bounds;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_variableA;

out vec4 outputColor;

float plot (vec2 st, float pct){
    return  smoothstep( pct-0.02, pct, st.y) - smoothstep( pct, pct+0.02, st.y);
}

vec2 st = gl_FragCoord.xy/u_bounds.xy;

void main() {

    // this line normalizes the x, if it is larger than y.
    st.x *= u_bounds.x/u_bounds.y;
    vec3 color = vec3(0.0);
    vec2 pos = vec2(0.5)-st;

    float r = length(pos);
    float a = atan(pos.y,pos.x);

    float line = mod(a, u_variableA);

    float f = cos(a*3.);
    // f = abs(cos(a*3.));
    // f = abs(cos(a*2.5))*.5+.3;

    f = abs(cos(a*11.968)) * sin(u_time) * .8 + .1;
    f = line;

    // f = smoothstep(-.5,1., cos(a*10.))*0.2+0.5;

    color = vec3( 1.-smoothstep(f,f+0.02,r) );

//    color = mix(color, vec3(1., 0., 0.), plot(st, line));

    outputColor = vec4(color, 1.0);
}

