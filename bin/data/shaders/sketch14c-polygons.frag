#version 150

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_bounds;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_variableA;

out vec4 outputColor;

#define PI 3.14159265359
#define TWO_PI (2 * PI)

vec2 st = gl_FragCoord.xy/u_bounds.xy;

void main() {

    // remap space from -1 to 1
    st = st * 2. - 1.;

    // this line normalizes the x, if it is larger than y.
    st.x *= u_bounds.x/u_bounds.y;

    vec3 color = vec3(0.0);

    // Number of sides of your shape
    float N = (sin(u_time / 1.) + 1.5) * 10.;

    float r = TWO_PI/float(N);
    float a = atan(st.y,st.x);

    // Shaping function that modulate the distance
    float d = cos(floor(.5 + a/r) * r - a) * length(st);

    color = vec3(1.0-smoothstep(.4,.41,d));

    outputColor = vec4(color, 1.0);
}
