import dabest
import pandas as pd
import matplotlib

data = pd.read_csv(
    "/Users/paul.ballot/Documents/Research/ConspiracyCor/CummingPlot_Data.csv"
)
data = data[["ResponseId", "Confidence", "ConditionTime", "Condition", "Time"]]
plot_data = dabest.load(
    data,
    idx=(
        ("Control Pre", "Control Post"),
        ("AI Pre", "AI Post"),
        ("Human Pre", "Human Post"),
    ),
    x="ConditionTime",
    y="Confidence",
    paired="baseline",
    id_col="ResponseId",
)
plot_data_diff = plot_data.mean_diff
my_color_palette = {
    "Control Pre": "#B8B8B8",
    "Control Post": "#B8B8B8",
    "AI Pre": "#1A80BB",
    "AI Post": "#1A80BB",
    "Human Pre": "#EA801C",
    "Human Post": "#EA801C",
}

plot_svg = plot_data.mean_diff.plot(
    float_contrast=False,
    contrast_marker_size=2,
    fontsize_rawxlabel=9,
    fontsize_rawylabel=9,
    fontsize_contrastxlabel=9,
    fontsize_contrastylabel=9,
    show_mini_meta=True,
    contrast_marker_kwargs={"markersize": 0, "alpha": 0.8, "zorder": 5},
    delta_dot=False,
    contrast_errorbar_kwargs={"lw": 2, "alpha": 0.5, "zorder": 2},
    slopegraph_kwargs={"jitter": 0, "color": "red"},
    # custom_palette = "viridis",
    color_col="Condition",
    dpi=150,
    contrast_paired_lines=False,
)
# plot_svg.savefig("Plot_2.svg")
with matplotlib.rc_context({"svg.fonttype": "none"}):
    plot_svg.savefig("Plot_Summerschool.svg")
