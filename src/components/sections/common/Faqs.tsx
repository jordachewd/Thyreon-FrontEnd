import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import css from "@/styles/sections/shared/Faqs.module.css";
import { faqs } from "@/constants/demo-data/faqs.const";
import { memo } from "react";
import PageHead from "@/components/layout/common/PageHead";
import classNames from "classnames";

type FaqsProps = {
  className?: string;
};

function Faqs(props: FaqsProps) {
  const sectionCss = classNames(css.section, props.className);

  return (
    <div className={sectionCss}>
      <div className={css.content}>
        <div className={css.head}>
          <PageHead
            title="Frequently Asked Questions"
            subtitle="Find answers to the most frequently asked questions below."
          />
        </div>
        <div className={css.faqs}>
          {faqs.map((faq) => (
            <Accordion key={faq.id}>
              <AccordionSummary
                expandIcon={<i className="bi bi-arrow-down-short text-xl"></i>}
                aria-controls={`panel${faq.id}-content`}
                id={`panel${faq.id}-header`}
              >
                <Typography component="span" variant="h6">
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(Faqs);
