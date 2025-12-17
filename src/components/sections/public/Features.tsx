import PageHead from "@/components/layout/common/PageHead";
import appFeatures from "@/constants/demo-data/features.const";
import { Typography } from "@/components/ui";

export default function Features() {
  return (
    <div className="flex flex-col w-full p-4">
      <div className="flex flex-col items-center justify-between w-full max-w-6xl mx-auto my-14 gap-12">
        <div className="flex flex-col justify-center items-center">
          <PageHead
            title="Automated Website Care"
            subtitle="Features that keep your WordPress site secure and optimized."
          />
        </div>
        <div className="flex flex-wrap w-full justify-between gap-16 lg:flex-row">
          {appFeatures.map((feature) => (
            <div key={feature.id} className="flex md:w-2/5 lg:w-full lg:flex-1 flex-col items-center gap-6">
              <i className={`bi ${feature.icon} text-7xl text-leaf-green-400`}></i>
              <Typography variant="h5">{feature.title}</Typography>
              <Typography variant="body1" className="text-center">
                {feature.description}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
