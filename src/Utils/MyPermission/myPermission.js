export const myPermission = (permission) => {
  const isArray = Array.isArray(permission);
  const hasPermission = {};
  if (!isArray) {
    hasPermission.allAllowed = true;
  } else {
    permission?.map((permissionObj) => {
      if (hasPermission?.[permissionObj?.departmentCode]) {
        hasPermission[permissionObj?.departmentCode][
          permissionObj?.permissionCode
        ] = permissionObj?.isAllowed;
      } else {
        hasPermission[permissionObj?.departmentCode] = {
          [permissionObj?.permissionCode]: permissionObj?.isAllowed,
        };
      }
    });
    Object?.keys(hasPermission)?.map((department) => {
      if (Object.values(hasPermission[department]).every((ele) => !ele)) {
        hasPermission[department].hasAllPermission = false;
      } else {
        hasPermission[department].hasAllPermission = true;
      }
    });
  }

  return hasPermission;
};
