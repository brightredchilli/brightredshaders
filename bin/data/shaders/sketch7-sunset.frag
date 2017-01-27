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
    return smoothstep( pct-0.01, pct, st.y) - smoothstep( pct, pct+0.01, st.y);
}

/**
 * When n = 1, you get smoothly decaying quantity, at n = inf you get step()
 */
float expStep(float x, float k, float n) {
    return exp(-k * pow(x,n) );
}

float dist(vec2 p1, vec2 p2) {
    return sqrt(pow((p1.x - p2.x), 2) + pow((p1.y - p2.y), 2));
}

vec2 xy = gl_FragCoord.xy;
vec2 norm_point = gl_FragCoord.xy/u_bounds;
vec3 skyBlue = vec3(0.38, 0.47, 0.74);
vec3 sunYellow = vec3(1.00, 0.94, 0.40);
vec3 sunOrange = vec3(0.98, 0.65, 0.15);
vec3 cloudWhite = vec3(0.98, 0.91, 0.69);
vec3 seaBlue = vec3(0., 160./255., 176./255.);

void main() {
    float x = norm_point.x;
    float y = norm_point.y;
    vec3 color = vec3(0.0);

    float step1 = 1./3.;
    float step2 = 2./3.;

    // mix three colors at two different stop points.
    color = mix(cloudWhite, sunOrange, smoothstep(1., step2, y));
    color = mix(color, seaBlue, smoothstep(step2, 0., y));

    // this part makes a 'sun' at a certain point and radius. The color fades out according to the
    // expStep function.
    float dist = dist(xy, vec2(750., 500.));
    float dist_norm = dist / 200.;
    float res = expStep(dist_norm, 2., 2.);
    color = mix(color, sunYellow, res);

    outputColor = vec4(color,1.0);
}
