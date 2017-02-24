#version 150

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_bounds;
uniform vec2 u_mouse;
uniform float u_time;

out vec4 outputColor;

float plot (vec2 st, float pct){
    return  smoothstep( pct-0.01, pct, st.y) - smoothstep( pct, pct+0.01, st.y);
}

vec2 st = gl_FragCoord.xy/u_bounds.xy;

void main() {

    // this line normalizes the x, if it is larger than y.
    st.x *= u_bounds.x/u_bounds.y;
    vec3 color = vec3(0.0);
    float d = 0.0;

    // Remap the space to -1. to 1.
    //    st = st *2.-1.;

    // Make the distance field

    vec2 field = abs(st) - .3;
    d = length(field);
    d = length(min(field, 0.));
    d = length(max(field, 0.));

    // Visualize the distance field

    // This line visualizes the distance field by making
    color = vec3(fract(d*10.0));

    // Drawing with the distance field
    // This is a simple color edge, if d is less than .1, then draw black, else draw white.
    // the argument in step controls the size of what's drawn
    color = vec3( step(.01, d) );

    // Variation from above, use two steps to create a stroke
    //    color = vec3( step(.3,d) * step(d,.4));

    // Variation from above, use two smooth steps to create a blurred stroke
    //color = vec3( smoothstep(.3,.4,d)* smoothstep(.6,.5,d));

    // for visualization sake, plot where .3 will be on the x axis.
    color = mix(color, vec3(1., 0., 0.), plot(st, 0.3));
    outputColor = vec4(color,1.0);
}

