var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};

// <stdin>
__markAsModule(exports);
__export(exports, {
  assets: () => import_assets.default,
  entry: () => entry,
  routes: () => routes
});

// node_modules/@remix-run/dev/compiler/shims/react.ts
var React = __toModule(require("react"));

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_server = __toModule(require("react-dom/server"));
var import_remix = __toModule(require("remix"));
require("dotenv").config();
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = import_server.default.renderToString(/* @__PURE__ */ React.createElement(import_remix.RemixServer, {
    context: remixContext,
    url: request.url
  }));
  responseHeaders.set("Content-Type", "text/html");
  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// route-module:/Users/andrewgarvin/Projects/poker-bank/app/root.tsx
var root_exports = {};
__export(root_exports, {
  CatchBoundary: () => CatchBoundary,
  ErrorBoundary: () => ErrorBoundary,
  default: () => App,
  links: () => links,
  loader: () => loader,
  meta: () => meta
});
var import_react3 = __toModule(require("react"));
var import_remix2 = __toModule(require("remix"));
var import_remix3 = __toModule(require("remix"));
var import_react_router_dom2 = __toModule(require("react-router-dom"));

// app/data/UserContext.tsx
var import_react = __toModule(require("react"));
var Context = import_react.default.createContext(null);
var useUsers = () => {
  const context = import_react.default.useContext(Context);
  if (!context) {
    throw new Error("Unable to use UserContext outside of Provider");
  }
  return context;
};
var UserContext = ({children, people}) => {
  return /* @__PURE__ */ import_react.default.createElement(Context.Provider, {
    value: {people: people != null ? people : []}
  }, children);
};
var UserContext_default = UserContext;

// app/components/Header.tsx
var import_react2 = __toModule(require("@headlessui/react"));
var import_outline = __toModule(require("@heroicons/react/outline"));
var import_react_router_dom = __toModule(require("react-router-dom"));
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
var Header = ({routes: routes2, activeRoute, setActiveRoute}) => {
  return /* @__PURE__ */ React.createElement(import_react2.Disclosure, {
    as: "nav",
    className: "bg-gray-800"
  }, ({open}) => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-7xl mx-auto sm:px-6 lg:px-8"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "border-b border-gray-700"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center justify-between h-16 px-4 sm:px-0"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex-shrink-0"
  }, /* @__PURE__ */ React.createElement("img", {
    className: "h-8 w-8",
    src: "https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg",
    alt: "Workflow"
  })), /* @__PURE__ */ React.createElement("div", {
    className: "hidden md:block"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "ml-10 flex items-baseline space-x-4"
  }, routes2.map((item) => {
    var _a;
    return /* @__PURE__ */ React.createElement(import_react_router_dom.Link, {
      key: item.name,
      to: item.href,
      onClick: () => setActiveRoute(item),
      className: classNames(item.name === activeRoute.name ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white", "px-3 py-2 rounded-md text-sm font-medium cursor-pointer"),
      "aria-current": item.name === activeRoute.name ? "page" : void 0
    }, (_a = item.title) != null ? _a : item.name);
  })))), /* @__PURE__ */ React.createElement("div", {
    className: "-mr-2 flex md:hidden"
  }, /* @__PURE__ */ React.createElement(import_react2.Disclosure.Button, {
    className: "bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "sr-only"
  }, "Open main menu"), open ? /* @__PURE__ */ React.createElement(import_outline.XIcon, {
    className: "block h-6 w-6",
    "aria-hidden": "true"
  }) : /* @__PURE__ */ React.createElement(import_outline.MenuIcon, {
    className: "block h-6 w-6",
    "aria-hidden": "true"
  })))))), /* @__PURE__ */ React.createElement(import_react2.Disclosure.Panel, {
    className: "border-b border-gray-700 md:hidden"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "px-2 py-3 space-y-1 sm:px-3"
  }, routes2.map((item) => /* @__PURE__ */ React.createElement("a", {
    key: item.name,
    href: item.href,
    className: classNames(item.name === activeRoute.name ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white", "block px-3 py-2 rounded-md text-base font-medium"),
    "aria-current": item.name === activeRoute.name ? "page" : void 0
  }, item.name))))));
};
var Header_default = Header;

// app/styles/global.css
var global_default = "/build/_assets/global-I5E7NNPL.css";

// app/styles/app.css
var app_default = "/build/_assets/app-UG5A2HU7.css";

// route-module:/Users/andrewgarvin/Projects/poker-bank/app/root.tsx
var links = () => {
  return [
    {rel: "stylesheet", href: global_default},
    {rel: "stylesheet", href: app_default}
  ];
};
var loader = async () => {
  const response = await fetch("https://api.github.com/gists/843c7ffbe1073bdaf45cfc48b86264c1", {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`
    }
  });
  const data = await response.json();
  return {
    people: JSON.parse(data.files.people.content)
  };
};
var meta = () => {
  return {
    title: "Poker Bank"
  };
};
function Document({
  children,
  title
}) {
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ React.createElement("link", {
    rel: "icon",
    href: "/favicon.png",
    type: "image/png"
  }), title ? /* @__PURE__ */ React.createElement("title", null, title) : null, /* @__PURE__ */ React.createElement(import_remix3.Meta, null), /* @__PURE__ */ React.createElement(import_remix3.Links, null)), /* @__PURE__ */ React.createElement("body", null, children, /* @__PURE__ */ React.createElement(import_remix3.Scripts, null), process.env.NODE_ENV === "development" && /* @__PURE__ */ React.createElement(import_remix3.LiveReload, null)));
}
var navigation = [
  {name: "Chip Bank", title: "Overview", href: "/"}
];
function App() {
  const {people} = (0, import_remix2.useLoaderData)();
  const [activeRoute, setActiveRoute] = (0, import_react3.useState)(navigation[0]);
  return /* @__PURE__ */ React.createElement(Document, null, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Header_default, {
    routes: navigation,
    activeRoute,
    setActiveRoute
  }), /* @__PURE__ */ React.createElement("div", {
    className: "bg-gray-800 pb-32"
  }, /* @__PURE__ */ React.createElement("header", {
    className: "py-10"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "text-3xl font-bold text-white"
  }, activeRoute.name)))), /* @__PURE__ */ React.createElement(UserContext_default, {
    people
  }, /* @__PURE__ */ React.createElement("main", {
    className: "-mt-32"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "bg-white rounded-lg shadow px-5 py-6 sm:px-6"
  }, /* @__PURE__ */ React.createElement(import_react_router_dom2.Outlet, null)))))));
}
function CatchBoundary() {
  let caught = (0, import_remix3.useCatch)();
  switch (caught.status) {
    case 401:
    case 404:
      return /* @__PURE__ */ React.createElement(Document, {
        title: `${caught.status} ${caught.statusText}`
      }, /* @__PURE__ */ React.createElement("h1", null, caught.status, " ", caught.statusText));
    default:
      throw new Error(`Unexpected caught response with status: ${caught.status}`);
  }
}
function ErrorBoundary({error}) {
  console.error(error);
  return /* @__PURE__ */ React.createElement(Document, {
    title: "Uh-oh!"
  }, /* @__PURE__ */ React.createElement("h1", null, "App Error"), /* @__PURE__ */ React.createElement("pre", null, error.message), /* @__PURE__ */ React.createElement("p", null, "Replace this UI with what you want users to see when your app throws uncaught errors."));
}

// route-module:/Users/andrewgarvin/Projects/poker-bank/app/routes/profile.tsx
var profile_exports = {};
__export(profile_exports, {
  default: () => Profile
});
var import_react_router_dom3 = __toModule(require("react-router-dom"));
function Profile() {
  return /* @__PURE__ */ React.createElement(import_react_router_dom3.Outlet, null);
}

// route-module:/Users/andrewgarvin/Projects/poker-bank/app/routes/profile/$user.tsx
var user_exports = {};
__export(user_exports, {
  action: () => action,
  default: () => UserProfile,
  loader: () => loader2
});
var import_react4 = __toModule(require("react"));
var import_remix4 = __toModule(require("remix"));
var import_react_router_dom4 = __toModule(require("react-router-dom"));

// app/components/CurrencyInput.tsx
function CurrencyInput({id, value, onChange}) {
  return /* @__PURE__ */ React.createElement("div", {
    className: "mt-1 relative rounded-md shadow-sm"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500 sm:text-sm"
  }, "$")), /* @__PURE__ */ React.createElement("input", {
    type: "number",
    name: "balance",
    id,
    className: "focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md",
    placeholder: "0.00",
    "aria-describedby": "price-currency",
    value,
    onChange: (event) => onChange(event.target.value)
  }), /* @__PURE__ */ React.createElement("div", {
    className: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500 sm:text-sm",
    id: "price-currency"
  }, "USD")));
}

// route-module:/Users/andrewgarvin/Projects/poker-bank/app/routes/profile/$user.tsx
var loader2 = ({params}) => {
  return {
    params
  };
};
var action = async ({params, request}) => {
  const response = await fetch("https://api.github.com/gists/843c7ffbe1073bdaf45cfc48b86264c1", {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`
    }
  });
  const data = await response.json();
  let people = JSON.parse(data.files.people.content);
  let body = new URLSearchParams(await request.text());
  people = people.map((person) => {
    var _a, _b;
    if (person.name === ((_a = params.user) == null ? void 0 : _a.replace("-", " "))) {
      return {
        name: person.name,
        bank: Number((_b = body.get("balance")) != null ? _b : person.bank),
        imageUrl: person.imageUrl
      };
    }
    return person;
  });
  await fetch("https://api.github.com/gists/843c7ffbe1073bdaf45cfc48b86264c1", {
    method: "patch",
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`
    },
    body: JSON.stringify({
      files: {
        people: {content: JSON.stringify(people, null, 2)}
      }
    })
  });
  return (0, import_remix4.redirect)(`/`);
};
function UserProfile() {
  var _a, _b, _c;
  const data = (0, import_remix4.useLoaderData)();
  const navigate = (0, import_react_router_dom4.useNavigate)();
  const {people} = useUsers();
  const currentUser = people.filter((person) => person.name === data.params.user.replace("-", " "))[0];
  const [firstName, setFirstName] = (0, import_react4.useState)((_a = currentUser.name.split(" ")[0]) != null ? _a : "");
  const [lastName, setLastName] = (0, import_react4.useState)((_b = currentUser.name.split(" ")[1]) != null ? _b : "");
  const [imageUrl, setImageUrl] = (0, import_react4.useState)(currentUser.imageUrl);
  const [balance, setBalance] = (0, import_react4.useState)((_c = currentUser.bank) != null ? _c : 0);
  return /* @__PURE__ */ React.createElement("form", {
    className: "space-y-8 divide-y divide-gray-200",
    method: "POST"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "space-y-8 divide-y divide-gray-200 sm:space-y-5"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "space-y-6 sm:space-y-5"
  }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", {
    className: "text-lg leading-6 font-medium text-gray-900"
  }, "Personal Information"), /* @__PURE__ */ React.createElement("p", {
    className: "mt-1 max-w-2xl text-sm text-gray-500"
  }, "Details about the current user.")), /* @__PURE__ */ React.createElement("div", {
    className: "space-y-6 sm:space-y-5"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
  }, /* @__PURE__ */ React.createElement("label", {
    htmlFor: "first-name",
    className: "block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
  }, "First name"), /* @__PURE__ */ React.createElement("div", {
    className: "mt-1 sm:mt-0 sm:col-span-2"
  }, /* @__PURE__ */ React.createElement("input", {
    type: "text",
    name: "first-name",
    id: "first-name",
    autoComplete: "given-name",
    className: "max-w-lg block w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md cursor-not-allowed bg-gray-200",
    value: firstName,
    onChange: (evnt) => setFirstName(evnt.target.value),
    disabled: true
  }))), /* @__PURE__ */ React.createElement("div", {
    className: "sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
  }, /* @__PURE__ */ React.createElement("label", {
    htmlFor: "last-name",
    className: "block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
  }, "Last name"), /* @__PURE__ */ React.createElement("div", {
    className: "mt-1 sm:mt-0 sm:col-span-2"
  }, /* @__PURE__ */ React.createElement("input", {
    type: "text",
    name: "last-name",
    id: "last-name",
    autoComplete: "family-name",
    className: "max-w-lg block w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md cursor-not-allowed bg-gray-200",
    value: lastName,
    onChange: (evnt) => setLastName(evnt.target.value),
    disabled: true
  }))), /* @__PURE__ */ React.createElement("div", {
    className: "sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
  }, /* @__PURE__ */ React.createElement("label", {
    htmlFor: "imageURL",
    className: "block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
  }, "Image URL"), /* @__PURE__ */ React.createElement("div", {
    className: "mt-1 sm:mt-0 sm:col-span-2"
  }, /* @__PURE__ */ React.createElement("input", {
    id: "imageURL",
    name: "imageURL",
    type: "text",
    className: "block max-w-lg w-full shadow-sm sm:text-sm border-gray-300 rounded-md cursor-not-allowed bg-gray-200",
    value: imageUrl,
    onChange: (evnt) => setImageUrl(evnt.target.value),
    disabled: true
  }))), /* @__PURE__ */ React.createElement("div", {
    className: "sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
  }, /* @__PURE__ */ React.createElement("label", {
    htmlFor: "balance",
    className: "block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
  }, "Current Balance"), /* @__PURE__ */ React.createElement(CurrencyInput, {
    id: "balance",
    value: balance,
    onChange: setBalance
  }))))), /* @__PURE__ */ React.createElement("div", {
    className: "pt-5"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex justify-end"
  }, /* @__PURE__ */ React.createElement("button", {
    type: "button",
    onClick: () => navigate("/"),
    className: "bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  }, "Cancel"), /* @__PURE__ */ React.createElement("button", {
    type: "submit",
    className: "ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  }, "Save"))));
}

// route-module:/Users/andrewgarvin/Projects/poker-bank/app/routes/chips.tsx
var chips_exports = {};
__export(chips_exports, {
  default: () => Chips
});
function Chips() {
  return /* @__PURE__ */ React.createElement("h1", null, "Chips Page");
}

// route-module:/Users/andrewgarvin/Projects/poker-bank/app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => routes_default
});
var import_react_router_dom5 = __toModule(require("react-router-dom"));
var Index = () => {
  const {people} = useUsers();
  return /* @__PURE__ */ React.createElement("div", {
    className: "grid grid-cols-1 gap-4 sm:grid-cols-2"
  }, people.sort((a, b) => {
    if (a.name > b.name)
      return 1;
    if (a.name < b.name)
      return -1;
    return 0;
  }).sort((a, b) => {
    if (a.bank > b.bank)
      return -1;
    if (a.bank < b.bank)
      return 1;
    return 0;
  }).map((person, index) => {
    let cardColor = "";
    switch (index) {
      case 0:
        cardColor = "bg-yellow-300 bg-opacity-50 border-yellow-300 hover:border-yellow-500";
        break;
      case 1:
        cardColor = "bg-gray-200 border-gray-300";
        break;
      case 2:
        cardColor = "bg-yellow-700 bg-opacity-25 border-yellow-300 hover:border-yellow-600";
        break;
      default:
        cardColor = "bg-white border-gray-300";
        break;
    }
    return /* @__PURE__ */ React.createElement(import_react_router_dom5.Link, {
      key: person.name,
      to: `/profile/${person.name.replace(" ", "-")}`,
      className: `relative rounded-lg border px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 ${cardColor}`
    }, /* @__PURE__ */ React.createElement("div", {
      className: "flex-shrink-0"
    }, /* @__PURE__ */ React.createElement("img", {
      className: "h-10 w-10 rounded-full",
      src: person.imageUrl,
      alt: ""
    })), /* @__PURE__ */ React.createElement("div", {
      className: "flex-1 min-w-0"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "focus:outline-none"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "absolute inset-0",
      "aria-hidden": "true"
    }), /* @__PURE__ */ React.createElement("p", {
      className: "text-sm font-medium text-gray-900"
    }, person.name), /* @__PURE__ */ React.createElement("p", {
      className: "text-sm text-gray-500 truncate"
    }, new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(person.bank)))));
  }));
};
var routes_default = Index;

// route-module:/Users/andrewgarvin/Projects/poker-bank/app/routes/404.tsx
var __exports = {};
__export(__exports, {
  default: () => FourOhFour,
  meta: () => meta2
});
var meta2 = () => {
  return {title: "Ain't nothing here"};
};
function FourOhFour() {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "404"));
}

// <stdin>
var import_assets = __toModule(require("./assets.json"));
var entry = {module: entry_server_exports};
var routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/profile": {
    id: "routes/profile",
    parentId: "root",
    path: "profile",
    index: void 0,
    caseSensitive: void 0,
    module: profile_exports
  },
  "routes/profile/$user": {
    id: "routes/profile/$user",
    parentId: "routes/profile",
    path: ":user",
    index: void 0,
    caseSensitive: void 0,
    module: user_exports
  },
  "routes/chips": {
    id: "routes/chips",
    parentId: "root",
    path: "chips",
    index: void 0,
    caseSensitive: void 0,
    module: chips_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: routes_exports
  },
  "routes/404": {
    id: "routes/404",
    parentId: "root",
    path: "404",
    index: void 0,
    caseSensitive: void 0,
    module: __exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  entry,
  routes
});
//# sourceMappingURL=/build/index.js.map
