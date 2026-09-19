"""
Leaky Integrate-and-Fire (LIF) Equation Animation
Powered by Manim (3b1b / Manim Community)

Visualizes:
1. The biophysical differential equation of a biological neuron.
2. Step-by-step term isolation: membrane time constant, leak current, synaptic inputs, and external stimuli.
3. Spiking threshold condition snapping to action potential reset.
"""

from manim import *

class LIFEquationScene(Scene):
    def construct(self):
        # Background styling
        self.camera.background_color = "#050508"

        # Title
        title = Text("Biophysical Neuron Dynamics: Leaky Integrate-and-Fire", font_size=28, color=TEAL_C)
        title.to_edge(UP, buff=0.6)
        self.play(Write(title), run_time=1.2)
        self.wait(0.5)

        # Base LIF differential equation
        eq1 = MathTex(
            r"\tau_m \frac{dV(t)}{dt}",
            r"=",
            r"-(V(t) - V_{\text{rest}})",
            r"+",
            r"R_m \left[ \sum_{j} W_{ij} S_j(t) + I_{\text{ext}}(t) \right]",
            font_size=36
        )
        eq1.set_color_by_tex(r"\tau_m", BLUE_C)
        eq1.set_color_by_tex(r"V_{\text{rest}}", GREEN_C)
        eq1.set_color_by_tex(r"W_{ij}", YELLOW_C)
        eq1.set_color_by_tex(r"I_{\text{ext}}", RED_C)

        self.play(FadeIn(eq1, shift=UP * 0.3), run_time=1.5)
        self.wait(1)

        # Term breakdown labels
        label_tau = Text("Membrane Time Constant", font_size=18, color=BLUE_C).next_to(eq1[0], UP, buff=0.8)
        arrow_tau = Arrow(label_tau.get_bottom(), eq1[0].get_top(), buff=0.1, color=BLUE_C, stroke_width=2)

        label_leak = Text("Ohmic Leak Current", font_size=18, color=GREEN_C).next_to(eq1[2], DOWN, buff=0.8)
        arrow_leak = Arrow(label_leak.get_top(), eq1[2].get_bottom(), buff=0.1, color=GREEN_C, stroke_width=2)

        self.play(Create(arrow_tau), Write(label_tau), run_time=0.8)
        self.play(Create(arrow_leak), Write(label_leak), run_time=0.8)
        self.wait(1.5)

        self.play(
            FadeOut(label_tau), FadeOut(arrow_tau),
            FadeOut(label_leak), FadeOut(arrow_leak)
        )

        # Action Potential Threshold Condition
        box = SurroundingRectangle(eq1, color=TEAL_B, buff=0.25, corner_radius=0.1)
        self.play(Create(box), run_time=0.8)

        threshold_eq = MathTex(
            r"\text{if } V(t) \ge V_{\text{th}} \implies",
            r"\text{Spike emitted, }",
            r"V(t) \leftarrow V_{\text{reset}}",
            font_size=32,
            color=YELLOW_B
        )
        threshold_eq.next_to(box, DOWN, buff=0.7)

        self.play(Write(threshold_eq), run_time=1.2)
        self.wait(1.5)

        # Pulse effect representing an action potential
        pulse = Flash(
            threshold_eq[1].get_center(),
            color=YELLOW_A,
            flash_radius=0.8,
            num_lines=16,
            run_time=0.8
        )
        self.play(pulse)
        self.wait(2)
