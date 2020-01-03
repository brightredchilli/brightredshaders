#version 150

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_bounds;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_variableA;
uniform float u_variableB;

out vec4 outputColor;

#define PI 3.14159265359
#define TWO_PI (2 * PI)

vec2 st = gl_FragCoord.xy/u_bounds.xy;
float normalizer = u_bounds.x/u_bounds.y;

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

vec2 truchetPattern(in vec2 _st, in float _index){
    _index = fract(((_index-0.5)*2.0));
    if (_index > 0.75) {
        _st = vec2(1.0) - _st;
    } else if (_index > 0.5) {
        _st = vec2(1.0-_st.x,_st.y);
    } else if (_index > 0.25) {
        _st = 1.0-vec2(1.0-_st.x,_st.y);
    }
    return _st;
}

mat2 rotate2d(float angle) {
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

void main() {

    // this line normalizes the x, if it is larger than y.
    st.x *= normalizer;

    st *= 10.0; // Scale the coordinate system by 10
    
    vec2 ipos = floor(st);  // get the integer coords
    vec2 fpos = fract(st);  // get the fractional coords

    vec2 tile = truchetPattern(fpos, random( ipos ));

    // Assign a random value based on the integer coord
    vec3 color = vec3(random(ipos));

    // this is a trick to drawing diagonal lines. y position goes from 0 to 1.
    float width = .1;
    color = vec3(smoothstep(tile.x - width,tile.x,tile.y) - smoothstep(tile.x, tile.x + width, tile.y));

    // uncomment to see the coordinate space
//    color = vec3(fpos,0.0);
    outputColor = vec4(color, 1.0);
}
