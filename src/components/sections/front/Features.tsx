import appFeatures from "@/constants/features.const";
import css from "@/styles/sections/front/Features.module.css";
import Typography from "@mui/material/Typography";
import PageHead from "../../shared/PageHead";

export default function Features() {
  return (
    <div className={css.section}>
      <div className={css.content}>
        <div className={css.head}>
          <PageHead
            title="Automated Website Care"
            subtitle="Features that keep your WordPress site secure and optimized."
          />
        </div>
        <div className={css.features}>
          {appFeatures.map((feature) => (
            <div key={feature.id} className={css.feature}>
              <i className={`bi ${feature.icon} ${css.icon}`}></i>
              <Typography variant="h6">{feature.title}</Typography>
              <Typography variant="body2" align="center">
                {feature.description}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
