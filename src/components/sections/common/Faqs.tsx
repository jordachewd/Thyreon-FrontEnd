import { Accordion, Typography } from "@/components/ui";
import { faqs } from "@/constants/demo-data/faqs.const";
import PageHead from "@/components/layout/common/PageHead";
import classNames from "classnames";

type FaqsProps = {
  className?: string;
};

export default function Faqs(props: FaqsProps) {
  const sectionCss = classNames("faqs-section", props.className);

  return (
    <div className={sectionCss}>
      <div className="faqs-content">
        <div className="faqs-head">
          <PageHead
            title="Frequently Asked Questions"
            subtitle="Find answers to the most frequently asked questions below."
          />
        </div>
        <div className="faqs-list">
          {faqs.map((faq) => (
            <Accordion key={faq.id} title={faq.question}>
              <Typography variant="body2">{faq.answer}</Typography>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
}
