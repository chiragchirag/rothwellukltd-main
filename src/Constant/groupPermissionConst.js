import { capitalizeFirstLetter } from "../Utils";
import department from "./department";
import permission from "./permission";

export const PERMISSION_KEY = {};
export const DEPARTMENT_KEY = {};
export const DEPARTMENT_CODE = {};

permission?.map((permissionObj) => {
  const { permissionCode, permissionKey } = permissionObj;
  PERMISSION_KEY[permissionCode] = permissionKey;
});

department?.map((departmentObj) => {
  const { departmentCode, departmentKey } = departmentObj;
  DEPARTMENT_KEY[departmentCode] = departmentKey;
});

department?.map((departmentObj) => {
  const { departmentCode, departmentKey } = departmentObj;
  DEPARTMENT_CODE[departmentKey] = departmentCode;
});

const PERMISSION_CRUD_CODE = [
  "P-001",
  "P-002",
  "P-003",
  "P-004",
  "P-006",
  "P-007",
  "P-008",
  "P-009",
  "P-010",
  "P-011",
  "P-012",
  "P-013",
  "P-014",
  "P-015",
  "P-016",
  "P-017",
  "P-018",
  "P-019",
  "P-020",
];
const groupPermissionViewEditDelete = PERMISSION_CRUD_CODE?.map(
  (permissionCode) => {
    return {
      label: capitalizeFirstLetter(PERMISSION_KEY?.[permissionCode]),
      value: PERMISSION_KEY?.[permissionCode],
    };
  }
);
export const GROUP_PERMISSION_CHECKBOXES = [
  {
    title: "Products",
    departmentKey: "products",
    data: [...groupPermissionViewEditDelete.slice(0, 4)],
  },
  {
    title: "Point Of Sale (POS)",
    departmentKey: "point-of-sale",
    data: [
      {
        label: capitalizeFirstLetter(PERMISSION_KEY?.["P-005"]),
        value: PERMISSION_KEY?.["P-005"],
      },
    ],
  },
  {
    title: "New Stock",
    departmentKey: "new-stock",
    data: [...groupPermissionViewEditDelete.slice(0, 4)],
  },
  {
    title: "Vegetable and Fruits",
    departmentKey: "veg-fruit",
    data: [...groupPermissionViewEditDelete.slice(0, 4)],
  },
  {
    title: "Sales",
    departmentKey: "sales",
    data: [...groupPermissionViewEditDelete.slice(0, 4)],
  },
  {
    title: "Purchase",
    departmentKey: "purchase",
    data: [...groupPermissionViewEditDelete.slice(0, 4)],
  },
  {
    title: "Sales-return",
    departmentKey: "sales-return",
    data: [groupPermissionViewEditDelete[0], groupPermissionViewEditDelete[3]],
  },
  {
    title: "Purchase-return",
    departmentKey: "purchase-return",
    data: [groupPermissionViewEditDelete[0], groupPermissionViewEditDelete[3]],
  },
  {
    title: "Quotation",
    departmentKey: "quotation",
    data: [
      groupPermissionViewEditDelete[0],
      groupPermissionViewEditDelete[3],
      groupPermissionViewEditDelete[2],
    ],
  },
  {
    title: "Expenses",
    departmentKey: "expenses",
    data: [
      groupPermissionViewEditDelete[0],
      groupPermissionViewEditDelete[3],
      groupPermissionViewEditDelete[2],
    ],
  },
  {
    title: "Offer",
    departmentKey: "discount",
    data: [
      groupPermissionViewEditDelete[3],
      groupPermissionViewEditDelete[2],
      groupPermissionViewEditDelete[1],
    ],
  },
  {
    title: "Customer",
    departmentKey: "customer",
    data: [
      groupPermissionViewEditDelete[2],
      groupPermissionViewEditDelete[3],
      groupPermissionViewEditDelete[1],
    ],
  },
  {
    title: "User",
    departmentKey: "user",
    data: [groupPermissionViewEditDelete[2], groupPermissionViewEditDelete[3]],
  },
  {
    title: "Supplier",
    departmentKey: "supplier",
    data: [
      groupPermissionViewEditDelete[2],
      groupPermissionViewEditDelete[3],
      groupPermissionViewEditDelete[1],
    ],
  },
  {
    title: "System Setting",
    departmentKey: "system-setting",
    data: [groupPermissionViewEditDelete[0], groupPermissionViewEditDelete[2]],
  },
  // {
  //   title: "Group Permission",
  //   departmentKey: "group-permission",
  //   data: [
  //     groupPermissionViewEditDelete[0],
  //     groupPermissionViewEditDelete[3],
  //     groupPermissionViewEditDelete[2],
  //   ],
  // },
  {
    title: "Department",
    departmentKey: "department",
    data: [groupPermissionViewEditDelete[2], groupPermissionViewEditDelete[3]],
  },
  {
    title: "Brand",
    departmentKey: "brand",
    data: [
      groupPermissionViewEditDelete[2],
      groupPermissionViewEditDelete[3],
      groupPermissionViewEditDelete[1],
    ],
  },
  {
    title: "Category",
    departmentKey: "category",
    data: [
      groupPermissionViewEditDelete[2],
      groupPermissionViewEditDelete[3],
      groupPermissionViewEditDelete[1],
    ],
  },
  {
    title: "Currency",
    departmentKey: "currency",
    data: [groupPermissionViewEditDelete[3], groupPermissionViewEditDelete[1]],
  },
  {
    title: "Unit",
    departmentKey: "unit",
    data: [
      groupPermissionViewEditDelete[2],
      groupPermissionViewEditDelete[3],
      groupPermissionViewEditDelete[1],
    ],
  },
  {
    title: "Report",
    departmentKey: "report",
    data: [...groupPermissionViewEditDelete.slice(4)],
  },
];
