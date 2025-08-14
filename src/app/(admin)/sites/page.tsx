import PageHead from "@/components/layout/common/PageHead";
import { Typography } from "@mui/material";
import classNames from "classnames";

export default function SitesPage() {
  const gridCss = "grid grid-cols-4 gap-6";
  const cellBase = "flex flex-col p-8 rounded gap-4 border";
  const cellBg = "bg-vanilla-100 dark:bg-midnight-800";
  const cellBorder = "border-vanilla-200 dark:border-midnight-600";
  const cellCss = classNames(cellBase, cellBg, cellBorder);

  return (
    <>
      <PageHead title="Overview" alignTitle="left" />
      <div className={gridCss}>
        <div className={cellCss}>
          <Typography variant="h5">Overview 01</Typography>
          <p>
            Lorem ipsum dolor sit amet. Ea itaque natus cum ipsam eveniet aut
            blanditiis quis 33 illum eaque.
          </p>
        </div>
        <div className={cellCss}>
          <Typography variant="h5">Overview 02</Typography>
          <p>
            Aut consequuntur omnis id accusantium obcaecati cum velit saepe qui
            dolores cupiditate.
          </p>
        </div>
        <div className={cellCss}>
          <Typography variant="h5">Overview 03</Typography>
          <p>
            Sed dolor libero sit omnis veniam sed repellat omnis eos nisi
            temporibus est laudantium.
          </p>
        </div>
        <div className={`${cellCss} row-span-2`}>
          <Typography variant="h5">Overview 04</Typography>
          <p>
            Ut eveniet officia id officia impedit qui consequatur veritatis quo
            laboriosam sequi et rerum quibusdam ea accusamus molestiae quo
            explicabo ducimus. Lorem ipsum dolor sit amet.
          </p>
          <p>
            Aut consequuntur omnis id accusantium obcaecati cum velit saepe qui
            dolores cupiditate hic blanditiis similique. Sed dolor libero sit
            omnis veniam sed repellat omnis eos nisi temporibus est laudantium
            internos. Lorem ipsum dolor sit amet.{" "}
          </p>
        </div>
        <div className={`${cellCss} row-span-2 col-span-3`}>
          <Typography variant="h5">Overview 05</Typography>
          <p>
            Lorem ipsum dolor sit amet. Ea itaque natus cum ipsam eveniet aut
            blanditiis quis 33 illum eaque a voluptatem cupiditate et excepturi
            aperiam ea perferendis iure. Aut consequuntur omnis id accusantium
            obcaecati cum velit saepe qui dolores cupiditate hic blanditiis
            similique. Sed dolor libero sit omnis veniam sed repellat omnis eos
            nisi temporibus est laudantium internos. Aut consequuntur omnis id
            accusantium obcaecati cum velit saepe qui dolores cupiditate hic
            blanditiis similique. Sed dolor libero sit omnis veniam sed repellat
            omnis eos nisi temporibus est laudantium internos. Aut consequuntur
            omnis id accusantium obcaecati cum velit saepe qui dolores
            cupiditate hic blanditiis similique. Sed dolor libero sit omnis
            veniam sed repellat omnis eos nisi temporibus est laudantium
            internos.
          </p>
          <p>
            Lorem ipsum dolor sit amet. Ea itaque natus cum ipsam eveniet aut
            blanditiis quis 33 illum eaque a voluptatem cupiditate et excepturi
            aperiam ea perferendis iure. Aut consequuntur omnis id accusantium
            obcaecati cum velit saepe qui dolores cupiditate hic blanditiis
            similique. Sed dolor libero sit omnis veniam sed repellat omnis eos
            nisi temporibus est laudantium internos. Aut consequuntur omnis id
            accusantium obcaecati cum velit saepe qui dolores cupiditate hic
            blanditiis similique. Sed dolor libero sit omnis veniam sed repellat
            omnis eos nisi temporibus est laudantium internos. Aut consequuntur
            omnis id accusantium obcaecati cum velit saepe qui dolores
            cupiditate hic blanditiis similique. Sed dolor libero sit omnis
            veniam sed repellat omnis eos nisi temporibus est laudantium
            internos.
          </p>
        </div>
        <div className={cellCss}>
          <Typography variant="h5">Overview 06</Typography>
          <p>
            Sed dolor libero sit omnis veniam sed repellat omnis eos nisi
            temporibus est laudantium internos voluptatem cumque ad odio
            impedit.
          </p>
        </div>
        <div className={cellCss}>
          <Typography variant="h5">Overview 07</Typography>
          <p>
            Ut eveniet officia id officia impedit qui consequatur veritatis quo
            laboriosam sequi et rerum quibusdam ea accusamus molestiae.
          </p>
        </div>
        <div className={cellCss}>
          <Typography variant="h5">Overview 08</Typography>
          <p>
            Aut consequuntur omnis id accusantium obcaecati cum velit saepe qui
            dolores cupiditate hic blanditiis similique sed dolor libero sit
            omnis.
          </p>
        </div>
        <div className={`${cellCss} row-span-2 col-span-2`}>
          <Typography variant="h5">Overview 09</Typography>
          <p>
            Aut consequuntur omnis id accusantium obcaecati cum velit saepe qui
            dolores cupiditate hic blanditiis similique. Sed dolor libero sit
            omnis veniam sed repellat omnis eos nisi temporibus est laudantium
            internos.
          </p>
          <p>
            Aut consequuntur omnis id accusantium obcaecati cum velit saepe qui
            dolores cupiditate hic blanditiis similique. Sed dolor libero sit
            omnis veniam sed repellat omnis eos nisi temporibus est laudantium
            internos.
          </p>
          <p>
            Ut eveniet officia id officia impedit qui consequatur veritatis quo
            laboriosam sequi et rerum quibusdam ea accusamus molestiae quo
            explicabo ducimus.
          </p>
          <p>
            Ea itaque natus cum ipsam eveniet aut blanditiis quis 33 illum eaque
            a voluptatem cupiditate et excepturi aperiam ea perferendis iure.
          </p>
        </div>
        <div className={`${cellCss} col-span-2`}>
          <Typography variant="h5">Overview 10</Typography>
          <p>
            Ut eveniet officia id officia impedit qui consequatur veritatis quo
            laboriosam sequi et rerum quibusdam ea accusamus molestiae quo
            explicabo ducimus. Ea itaque natus cum ipsam eveniet aut blanditiis
            quis 33 illum eaque a voluptatem cupiditate et excepturi aperiam ea
            perferendis iure.
          </p>
        </div>
        <div className={`${cellCss} col-span-2`}>
          <Typography variant="h5">Overview 11</Typography>
          <p>
            Aut consequuntur omnis id accusantium obcaecati cum velit saepe qui
            dolores cupiditate hic blanditiis similique. Sed dolor libero sit
            omnis veniam sed repellat omnis eos nisi temporibus est laudantium
            internos.
          </p>
        </div>
        <div className={`${cellCss} col-span-2`}>
          <Typography variant="h5">Overview 12</Typography>
          <p>
            Aut consequuntur omnis id accusantium obcaecati cum velit saepe qui
            dolores cupiditate hic blanditiis similique. Sed dolor libero sit
            omnis veniam sed repellat omnis eos nisi temporibus est laudantium
            internos.
          </p>
        </div>
      </div>
    </>
  );
}
