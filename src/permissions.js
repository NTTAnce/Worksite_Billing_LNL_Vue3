import encryption from "./encryption.js";

export default {
  data() {
    return {
      permissionDeniedToolTip:
        "Your current permissions do not allow this action.",
    };
  },
  methods: {
    checkPermissions(path) {
      let encryptedRole = window.sessionStorage.getItem("role");
      let role = encryption.decrypt(encryptedRole);

      let roles = [];
      let type = window.sessionStorage.getItem("type");
      if (type == "homeoffice" || type == "ext") {
        roles = role.split(",");
      } else {
        roles.push(role);
      }

      for (let route of this.$router.options.routes) {
        if (route.path.toLowerCase() == path.toLowerCase()) {
          let authorize = null;
          if (route.meta != null) {
            authorize = route.meta.authorize;
          }

          if (authorize == null || authorize.length == 0) {
            return true;
          } else {
            for (let role of roles) {
              if (role && authorize.includes(role)) {
                return true;
              }
            }
          }
        }
      }
      return false;
    },
    checkSpecificPermission(permissionsArray) {
      for (let permissionName of permissionsArray) {
        let encryptedRole = window.sessionStorage.getItem("role");
        let role = encryption.decrypt(encryptedRole);

        let roles = [];
        let type = window.sessionStorage.getItem("type");
        if (type == "homeoffice" || type == "ext") {
          roles = role.split(",");
        } else {
          roles.push(role);
        }

        for (let role of roles) {
          if (role && role.toLowerCase() == permissionName.toLowerCase())
            return true;
        }
      }
      return false;
    },
  },
};
