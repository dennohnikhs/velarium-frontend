const common = {
  dashboard: {
    title: "Dashboard",
    cards: {
      insurances: "Members",
      intermediaries: "Savings",
      businesses: "Accounts",
      accounts: "Accounts",
    },
    charts: {
      cover_types: "Savings Distribution",
      entities: "Members Distribution",
    }
  },

  master_data: {
    title: "Master Data",
    items: {
      make: "Vehicle Make",
      model: "Vehicle Model",
      lof: "Line of Business",
      entity_type: "Entity Types",
      policy_info: "Policy Information",
      entity: "Entities",
      entity_mappings: "Entity Mappings",
    },
  },
   member_data: {
    title: "Member Mgt",
    items: {
      register: "Register",
      personal: "Personal information",
      payment: "Payment" ,     
    }
  },

   account_data: {
    title: "Account Mgt",
    items: {
      register: "Register",
      credit: "Credit Status",
      payment: "Payment" ,     
    }
  },

  uam: {
    title: "Users",
    items: {
      users: "Users",
      groups: "Groups",
    },
  },
  copyright: {
    title: "All rights reserved",
  },
  navbar: {
    logout: "Logout",
  },
  exports: {
    to_pdf: "Export to PDF",
    to_excel: "Export to Excel"
  },
  reports: {
    title: "Reports",
    items: {
      deposits: "Deposits",      
    }
  }
};

export type CommonNamespace = typeof common;
export default common;