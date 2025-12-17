import { Column } from "@/components/ui";
import { Chip } from "@/components/ui";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import UsersNameCell from "@/components/sections/admin/shared/table/users/UserNameCell";
import SiteNameCell from "@/components/sections/app/sites/table/SiteNameCell";
import SiteActionCell from "@/components/sections/app/sites/table/SiteActionCell";

type AdminSitesTableColumnsType = {
  onEditSite: (siteData: Partial<GetSiteData>) => void;
  onDeleteSite: (siteData: Partial<GetSiteData>) => void;
};

export const adminSitesTableColumns = ({
  onEditSite,
  onDeleteSite,
}: AdminSitesTableColumnsType): Column[] => [
  {
    field: "id",
    headerName: "ID",
    minWidth: 80,
    renderCell: ({ value }) => {
      return <span className="text-xs">{value}</span>;
    },
  },
  {
    field: "siteName",
    headerName: "Site Name",
    flex: 1,
    minWidth: 200,
    renderCell: ({ row }) => {
      return (
        <SiteNameCell
          href={`/sites/${row.id}`}
          name={row.siteName}
          domain={row.domain}
        />
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    minWidth: 120,
    renderCell: ({ value }) => {
      const status = value;
      const statusColor = status === "active" ? "success" : "error";
      const chipColor = status === "revoked" ? "primary" : statusColor;
      return <Chip size="small" label={status} color={chipColor} />;
    },
  },
  {
    field: "createdAt",
    headerName: "Registered",
    minWidth: 150,
    renderCell: ({ value }) => {
      const createdAt = getFormattedDate(value);
      return <span className="text-xs">{createdAt}</span>;
    },
  },
  {
    field: "lastSeen",
    headerName: "Last Seen",
    minWidth: 150,
    renderCell: ({ value }) => {
      const lastSeen = getFormattedDate(value);
      return <span className="text-xs">{lastSeen}</span>;
    },
  },
  {
    field: "user",
    headerName: "Owner",
    minWidth: 180,
    renderCell: ({ row }) => {
      const user = row.user;
      if (!user) return null;
      
      return (
        <UsersNameCell
          href={`users/${user.id}`}
          image={user.clerkImg}
          username={user.username}
          firstname={user.firstName}
          lastname={user.lastName}
          noImage
        />
      );
    },
  },
  {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    minWidth: 100,
    renderCell: ({ row }) => (
      <SiteActionCell
        params={{ row, value: null }}
        onEdit={onEditSite}
        onRemove={onDeleteSite}
      />
    ),
  },
];
