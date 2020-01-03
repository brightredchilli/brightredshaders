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

    vec2 pos = st - vec2(.5 * u_bounds.x/u_bounds.y, .5);

    float r = length(pos);
    float a = atan(pos.y,pos.x);

    float f = cos(a*10.) * .05 + .3;

    // by using two steps, you can cut out the outline of any shape that you want
    // color = vec3(step(f, r + .001) - step(f, r));

    // by using fract and u_time, you can get the effect of the lines growing outward
    // but r is uniform distance...
    // color = vec3(step(fract(r * 20 - u_time), 0.92));

    // ... if you scale r by f, then you're saying, warp the uniform distance according to f.
    // mult simply makes it larger, this makes it pass through 'fract' more times
    int mult = 10;
    color = vec3(step(fract(f * r * mult - u_time), 0.92));


    outputColor = vec4(color, 1.0);
}

