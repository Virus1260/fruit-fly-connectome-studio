"""
Connectome Synapse Matrix Multiplication Animation
Powered by Manim (3b1b / Manim Community)

Visualizes how input action potential vectors S(t) are multiplied by the synaptic
weight matrix W to produce post-synaptic dendritic currents.
"""

from manim import *

class ConnectomeMatrixScene(Scene):
    def construct(self):
        self.camera.background_color = "#050508"

        # Title
        header = Text("Connectome Synaptic Weight Integration", font_size=28, color=TEAL_C)
        header.to_edge(UP, buff=0.6)
        self.play(Write(header), run_time=1.0)

        # Matrix formula
        matrix_eq = MathTex(
            r"\mathbf{I}_{\text{syn}}(t) = \mathbf{W} \cdot \mathbf{S}(t)",
            font_size=38,
            color=WHITE
        )
        matrix_eq.set_color_by_tex(r"\mathbf{W}", YELLOW_C)
        matrix_eq.set_color_by_tex(r"\mathbf{S}(t)", GREEN_C)
        matrix_eq.next_to(header, DOWN, buff=0.6)

        self.play(FadeIn(matrix_eq, shift=UP * 0.2))
        self.wait(0.5)

        # Expanded matrix representation
        expanded = MathTex(
            r"\begin{bmatrix} I_1 \\ I_2 \\ \vdots \\ I_N \end{bmatrix}",
            r"=",
            r"\begin{bmatrix} W_{11} & W_{12} & \cdots & W_{1M} \\ W_{21} & W_{22} & \cdots & W_{2M} \\ \vdots & \vdots & \ddots & \vdots \\ W_{N1} & W_{N2} & \cdots & W_{NM} \end{bmatrix}",
            r"\begin{bmatrix} S_1(t) \\ S_2(t) \\ \vdots \\ S_M(t) \end{bmatrix}",
            font_size=28
        )
        expanded.set_color_by_tex(r"W_{", YELLOW_C)
        expanded.set_color_by_tex(r"S_", GREEN_C)
        expanded.set_color_by_tex(r"I_", TEAL_B)
        expanded.next_to(matrix_eq, DOWN, buff=0.8)

        self.play(TransformMatchingTex(matrix_eq.copy(), expanded), run_time=1.8)
        self.wait(1.5)

        # Highlight sparse fruit fly connectivity fact
        fact = Text("125 Million Synaptic Edges connecting 166,691 Neurons (Sparsity > 99.5%)", font_size=18, color=LIGHT_GREY)
        fact.to_edge(DOWN, buff=0.6)
        self.play(Write(fact), run_time=1.0)
        self.wait(2)
