!(function () {
    "use strict";
    var t = "undefined" != typeof window ? window : void 0,
        i = "undefined" != typeof globalThis ? globalThis : t,
        e = Array.prototype,
        r = e.forEach,
        s = e.indexOf,
        n = null == i ? void 0 : i.navigator,
        o = null == i ? void 0 : i.document,
        a = null == i ? void 0 : i.location,
        l = null == i ? void 0 : i.fetch,
        u =
            null != i &&
            i.XMLHttpRequest &&
            "withCredentials" in new i.XMLHttpRequest()
                ? i.XMLHttpRequest
                : void 0,
        h = null == i ? void 0 : i.AbortController,
        d = null == n ? void 0 : n.userAgent,
        v = null != t ? t : {},
        c = { DEBUG: !1, LIB_VERSION: "1.248.1" },
        f = "$copy_autocapture",
        p = [
            "$snapshot",
            "$pageview",
            "$pageleave",
            "$set",
            "survey dismissed",
            "survey sent",
            "survey shown",
            "$identify",
            "$groupidentify",
            "$create_alias",
            "$$client_ingestion_warning",
            "$web_experiment_applied",
            "$feature_enrollment_update",
            "$feature_flag_called",
        ],
        g = (function (t) {
            return (t.GZipJS = "gzip-js"), (t.Base64 = "base64"), t;
        })({}),
        _ = ["fatal", "error", "warning", "log", "info", "debug"];
    function m(t, i) {
        return -1 !== t.indexOf(i);
    }
    var b = function (t) {
            return t.trim();
        },
        w = function (t) {
            return t.replace(/^\$/, "");
        };
    var y = Array.isArray,
        S = Object.prototype,
        $ = S.hasOwnProperty,
        k = S.toString,
        x =
            y ||
            function (t) {
                return "[object Array]" === k.call(t);
            },
        E = (t) => "function" == typeof t,
        I = (t) => t === Object(t) && !x(t),
        P = (t) => {
            if (I(t)) {
                for (var i in t) if ($.call(t, i)) return !1;
                return !0;
            }
            return !1;
        },
        R = (t) => void 0 === t,
        T = (t) => "[object String]" == k.call(t),
        M = (t) => T(t) && 0 === t.trim().length,
        C = (t) => null === t,
        O = (t) => R(t) || C(t),
        F = (t) => "[object Number]" == k.call(t),
        A = (t) => "[object Boolean]" === k.call(t),
        D = (t) => t instanceof FormData,
        L = (t) => m(p, t),
        N = (i) => {
            var e = {
                t: function (e) {
                    if (
                        t &&
                        (c.DEBUG || v.POSTHOG_DEBUG) &&
                        !R(t.console) &&
                        t.console
                    ) {
                        for (
                            var r =
                                    ("__rrweb_original__" in t.console[e])
                                        ? t.console[e].__rrweb_original__
                                        : t.console[e],
                                s = arguments.length,
                                n = new Array(s > 1 ? s - 1 : 0),
                                o = 1;
                            o < s;
                            o++
                        )
                            n[o - 1] = arguments[o];
                        r(i, ...n);
                    }
                },
                info: function () {
                    for (
                        var t = arguments.length, i = new Array(t), r = 0;
                        r < t;
                        r++
                    )
                        i[r] = arguments[r];
                    e.t("log", ...i);
                },
                warn: function () {
                    for (
                        var t = arguments.length, i = new Array(t), r = 0;
                        r < t;
                        r++
                    )
                        i[r] = arguments[r];
                    e.t("warn", ...i);
                },
                error: function () {
                    for (
                        var t = arguments.length, i = new Array(t), r = 0;
                        r < t;
                        r++
                    )
                        i[r] = arguments[r];
                    e.t("error", ...i);
                },
                critical: function () {
                    for (
                        var t = arguments.length, e = new Array(t), r = 0;
                        r < t;
                        r++
                    )
                        e[r] = arguments[r];
                    console.error(i, ...e);
                },
                uninitializedWarning: (t) => {
                    e.error("You must initialize PostHog before calling " + t);
                },
                createLogger: (t) => N(i + " " + t),
            };
            return e;
        },
        j = N("[PostHog.js]"),
        z = j.createLogger,
        U = z("[ExternalScriptsLoader]"),
        B = (t, i, e) => {
            if (t.config.disable_external_dependency_loading)
                return (
                    U.warn(
                        i +
                            " was requested but loading of external scripts is disabled."
                    ),
                    e("Loading of external scripts is disabled")
                );
            var r = null == o ? void 0 : o.querySelectorAll("script");
            if (r)
                for (var s = 0; s < r.length; s++)
                    if (r[s].src === i) return e();
            var n = () => {
                if (!o) return e("document not found");
                var r = o.createElement("script");
                if (
                    ((r.type = "text/javascript"),
                    (r.crossOrigin = "anonymous"),
                    (r.src = i),
                    (r.onload = (t) => e(void 0, t)),
                    (r.onerror = (t) => e(t)),
                    t.config.prepare_external_dependency_script &&
                        (r = t.config.prepare_external_dependency_script(r)),
                    !r)
                )
                    return e(
                        "prepare_external_dependency_script returned null"
                    );
                var s,
                    n = o.querySelectorAll("body > script");
                n.length > 0
                    ? null == (s = n[0].parentNode) || s.insertBefore(r, n[0])
                    : o.body.appendChild(r);
            };
            null != o && o.body
                ? n()
                : null == o || o.addEventListener("DOMContentLoaded", n);
        };
    function q() {
        return (
            (q = Object.assign
                ? Object.assign.bind()
                : function (t) {
                      for (var i = 1; i < arguments.length; i++) {
                          var e = arguments[i];
                          for (var r in e)
                              ({}).hasOwnProperty.call(e, r) && (t[r] = e[r]);
                      }
                      return t;
                  }),
            q.apply(null, arguments)
        );
    }
    function H(t, i) {
        if (null == t) return {};
        var e = {};
        for (var r in t)
            if ({}.hasOwnProperty.call(t, r)) {
                if (-1 !== i.indexOf(r)) continue;
                e[r] = t[r];
            }
        return e;
    }
    (v.__PosthogExtensions__ = v.__PosthogExtensions__ || {}),
        (v.__PosthogExtensions__.loadExternalDependency = (t, i, e) => {
            var r = "/static/" + i + ".js?v=" + t.version;
            if (
                ("remote-config" === i &&
                    (r = "/array/" + t.config.token + "/config.js"),
                "toolbar" === i)
            ) {
                var s = 3e5;
                r = r + "&t=" + Math.floor(Date.now() / s) * s;
            }
            var n = t.requestRouter.endpointFor("assets", r);
            B(t, n, e);
        }),
        (v.__PosthogExtensions__.loadSiteApp = (t, i, e) => {
            var r = t.requestRouter.endpointFor("api", i);
            B(t, r, e);
        });
    var W = {};
    function G(t, i, e) {
        if (x(t))
            if (r && t.forEach === r) t.forEach(i, e);
            else if ("length" in t && t.length === +t.length)
                for (var s = 0, n = t.length; s < n; s++)
                    if (s in t && i.call(e, t[s], s) === W) return;
    }
    function J(t, i, e) {
        if (!O(t)) {
            if (x(t)) return G(t, i, e);
            if (D(t)) {
                for (var r of t.entries())
                    if (i.call(e, r[1], r[0]) === W) return;
            } else
                for (var s in t)
                    if ($.call(t, s) && i.call(e, t[s], s) === W) return;
        }
    }
    var V = function (t) {
            for (
                var i = arguments.length,
                    e = new Array(i > 1 ? i - 1 : 0),
                    r = 1;
                r < i;
                r++
            )
                e[r - 1] = arguments[r];
            return (
                G(e, function (i) {
                    for (var e in i) void 0 !== i[e] && (t[e] = i[e]);
                }),
                t
            );
        },
        K = function (t) {
            for (
                var i = arguments.length,
                    e = new Array(i > 1 ? i - 1 : 0),
                    r = 1;
                r < i;
                r++
            )
                e[r - 1] = arguments[r];
            return (
                G(e, function (i) {
                    G(i, function (i) {
                        t.push(i);
                    });
                }),
                t
            );
        };
    function Y(t) {
        for (var i = Object.keys(t), e = i.length, r = new Array(e); e--; )
            r[e] = [i[e], t[i[e]]];
        return r;
    }
    var X = function (t) {
            try {
                return t();
            } catch (t) {
                return;
            }
        },
        Q = function (t) {
            return function () {
                try {
                    for (
                        var i = arguments.length, e = new Array(i), r = 0;
                        r < i;
                        r++
                    )
                        e[r] = arguments[r];
                    return t.apply(this, e);
                } catch (t) {
                    j.critical(
                        "Implementation error. Please turn on debug mode and open a ticket on https://app.posthog.com/home#panel=support%3Asupport%3A."
                    ),
                        j.critical(t);
                }
            };
        },
        Z = function (t) {
            var i = {};
            return (
                J(t, function (t, e) {
                    ((T(t) && t.length > 0) || F(t)) && (i[e] = t);
                }),
                i
            );
        };
    function tt(t, i) {
        return (
            (e = t),
            (r = (t) => (T(t) && !C(i) ? t.slice(0, i) : t)),
            (s = new Set()),
            (function t(i, e) {
                return i !== Object(i)
                    ? r
                        ? r(i, e)
                        : i
                    : s.has(i)
                    ? void 0
                    : (s.add(i),
                      x(i)
                          ? ((n = []),
                            G(i, (i) => {
                                n.push(t(i));
                            }))
                          : ((n = {}),
                            J(i, (i, e) => {
                                s.has(i) || (n[e] = t(i, e));
                            })),
                      n);
                var n;
            })(e)
        );
        var e, r, s;
    }
    var it = ["herokuapp.com", "vercel.app", "netlify.app"];
    function et(t) {
        var i = null == t ? void 0 : t.hostname;
        if (!T(i)) return !1;
        var e = i.split(".").slice(-2).join(".");
        for (var r of it) if (e === r) return !1;
        return !0;
    }
    function rt(t, i) {
        for (var e = 0; e < t.length; e++) if (i(t[e])) return t[e];
    }
    function st(t, i, e, r) {
        var { capture: s = !1, passive: n = !0 } = null != r ? r : {};
        null == t || t.addEventListener(i, e, { capture: s, passive: n });
    }
    var nt = "$people_distinct_id",
        ot = "__alias",
        at = "__timers",
        lt = "$autocapture_disabled_server_side",
        ut = "$heatmaps_enabled_server_side",
        ht = "$exception_capture_enabled_server_side",
        dt = "$error_tracking_suppression_rules",
        vt = "$web_vitals_enabled_server_side",
        ct = "$dead_clicks_enabled_server_side",
        ft = "$web_vitals_allowed_metrics",
        pt = "$session_recording_enabled_server_side",
        gt = "$console_log_recording_enabled_server_side",
        _t = "$session_recording_network_payload_capture",
        mt = "$session_recording_masking",
        bt = "$session_recording_canvas_recording",
        wt = "$replay_sample_rate",
        yt = "$replay_minimum_duration",
        St = "$replay_script_config",
        $t = "$sesid",
        kt = "$session_is_sampled",
        xt = "$session_recording_url_trigger_activated_session",
        Et = "$session_recording_event_trigger_activated_session",
        It = "$enabled_feature_flags",
        Pt = "$early_access_features",
        Rt = "$feature_flag_details",
        Tt = "$stored_person_properties",
        Mt = "$stored_group_properties",
        Ct = "$surveys",
        Ot = "$surveys_activated",
        Ft = "$flag_call_reported",
        At = "$user_state",
        Dt = "$client_session_props",
        Lt = "$capture_rate_limit",
        Nt = "$initial_campaign_params",
        jt = "$initial_referrer_info",
        zt = "$initial_person_info",
        Ut = "$epp",
        Bt = "__POSTHOG_TOOLBAR__",
        qt = "$posthog_cookieless",
        Ht = [
            nt,
            ot,
            "__cmpns",
            at,
            pt,
            ut,
            $t,
            It,
            dt,
            At,
            Pt,
            Rt,
            Mt,
            Tt,
            Ct,
            Ft,
            Dt,
            Lt,
            Nt,
            jt,
            Ut,
            zt,
        ];
    function Wt(t) {
        return (
            t instanceof Element &&
            (t.id === Bt ||
                !(
                    null == t.closest ||
                    !t.closest(".toolbar-global-fade-container")
                ))
        );
    }
    function Gt(t) {
        return !!t && 1 === t.nodeType;
    }
    function Jt(t, i) {
        return (
            !!t && !!t.tagName && t.tagName.toLowerCase() === i.toLowerCase()
        );
    }
    function Vt(t) {
        return !!t && 3 === t.nodeType;
    }
    function Kt(t) {
        return !!t && 11 === t.nodeType;
    }
    function Yt(t) {
        return t ? b(t).split(/\s+/) : [];
    }
    function Xt(i) {
        var e = null == t ? void 0 : t.location.href;
        return !!(e && i && i.some((t) => e.match(t)));
    }
    function Qt(t) {
        var i = "";
        switch (typeof t.className) {
            case "string":
                i = t.className;
                break;
            case "object":
                i =
                    (t.className && "baseVal" in t.className
                        ? t.className.baseVal
                        : null) ||
                    t.getAttribute("class") ||
                    "";
                break;
            default:
                i = "";
        }
        return Yt(i);
    }
    function Zt(t) {
        return O(t)
            ? null
            : b(t)
                  .split(/(\s+)/)
                  .filter((t) => ci(t))
                  .join("")
                  .replace(/[\r\n]/g, " ")
                  .replace(/[ ]+/g, " ")
                  .substring(0, 255);
    }
    function ti(t) {
        var i = "";
        return (
            ni(t) &&
                !oi(t) &&
                t.childNodes &&
                t.childNodes.length &&
                J(t.childNodes, function (t) {
                    var e;
                    Vt(t) &&
                        t.textContent &&
                        (i +=
                            null !== (e = Zt(t.textContent)) && void 0 !== e
                                ? e
                                : "");
                }),
            b(i)
        );
    }
    function ii(t) {
        return R(t.target)
            ? t.srcElement || null
            : null != (i = t.target) && i.shadowRoot
            ? t.composedPath()[0] || null
            : t.target || null;
        var i;
    }
    var ei = ["a", "button", "form", "input", "select", "textarea", "label"];
    function ri(t) {
        var i = t.parentNode;
        return !(!i || !Gt(i)) && i;
    }
    function si(i, e, r, s, n) {
        var o, a, l;
        if ((void 0 === r && (r = void 0), !t || !i || Jt(i, "html") || !Gt(i)))
            return !1;
        if (null != (o = r) && o.url_allowlist && !Xt(r.url_allowlist))
            return !1;
        if (null != (a = r) && a.url_ignorelist && Xt(r.url_ignorelist))
            return !1;
        if (null != (l = r) && l.dom_event_allowlist) {
            var u = r.dom_event_allowlist;
            if (u && !u.some((t) => e.type === t)) return !1;
        }
        for (
            var h = !1, d = [i], v = !0, c = i;
            c.parentNode && !Jt(c, "body");

        )
            if (Kt(c.parentNode))
                d.push(c.parentNode.host), (c = c.parentNode.host);
            else {
                if (!(v = ri(c))) break;
                if (s || ei.indexOf(v.tagName.toLowerCase()) > -1) h = !0;
                else {
                    var f = t.getComputedStyle(v);
                    f && "pointer" === f.getPropertyValue("cursor") && (h = !0);
                }
                d.push(v), (c = v);
            }
        if (
            !(function (t, i) {
                var e = null == i ? void 0 : i.element_allowlist;
                if (R(e)) return !0;
                var r,
                    s = function (t) {
                        if (e.some((i) => t.tagName.toLowerCase() === i))
                            return { v: !0 };
                    };
                for (var n of t) if ((r = s(n))) return r.v;
                return !1;
            })(d, r)
        )
            return !1;
        if (
            !(function (t, i) {
                var e = null == i ? void 0 : i.css_selector_allowlist;
                if (R(e)) return !0;
                var r,
                    s = function (t) {
                        if (e.some((i) => t.matches(i))) return { v: !0 };
                    };
                for (var n of t) if ((r = s(n))) return r.v;
                return !1;
            })(d, r)
        )
            return !1;
        var p = t.getComputedStyle(i);
        if (
            p &&
            "pointer" === p.getPropertyValue("cursor") &&
            "click" === e.type
        )
            return !0;
        var g = i.tagName.toLowerCase();
        switch (g) {
            case "html":
                return !1;
            case "form":
                return (n || ["submit"]).indexOf(e.type) >= 0;
            case "input":
            case "select":
            case "textarea":
                return (n || ["change", "click"]).indexOf(e.type) >= 0;
            default:
                return h
                    ? (n || ["click"]).indexOf(e.type) >= 0
                    : (n || ["click"]).indexOf(e.type) >= 0 &&
                          (ei.indexOf(g) > -1 ||
                              "true" === i.getAttribute("contenteditable"));
        }
    }
    function ni(t) {
        for (var i = t; i.parentNode && !Jt(i, "body"); i = i.parentNode) {
            var e = Qt(i);
            if (m(e, "ph-sensitive") || m(e, "ph-no-capture")) return !1;
        }
        if (m(Qt(t), "ph-include")) return !0;
        var r = t.type || "";
        if (T(r))
            switch (r.toLowerCase()) {
                case "hidden":
                case "password":
                    return !1;
            }
        var s = t.name || t.id || "";
        if (T(s)) {
            if (
                /^cc|cardnum|ccnum|creditcard|csc|cvc|cvv|exp|pass|pwd|routing|seccode|securitycode|securitynum|socialsec|socsec|ssn/i.test(
                    s.replace(/[^a-zA-Z0-9]/g, "")
                )
            )
                return !1;
        }
        return !0;
    }
    function oi(t) {
        return !!(
            (Jt(t, "input") &&
                !["button", "checkbox", "submit", "reset"].includes(t.type)) ||
            Jt(t, "select") ||
            Jt(t, "textarea") ||
            "true" === t.getAttribute("contenteditable")
        );
    }
    var ai =
            "(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11})",
        li = new RegExp("^(?:" + ai + ")$"),
        ui = new RegExp(ai),
        hi = "\\d{3}-?\\d{2}-?\\d{4}",
        di = new RegExp("^(" + hi + ")$"),
        vi = new RegExp("(" + hi + ")");
    function ci(t, i) {
        if ((void 0 === i && (i = !0), O(t))) return !1;
        if (T(t)) {
            if (
                ((t = b(t)), (i ? li : ui).test((t || "").replace(/[- ]/g, "")))
            )
                return !1;
            if ((i ? di : vi).test(t)) return !1;
        }
        return !0;
    }
    function fi(t) {
        var i = ti(t);
        return ci((i = (i + " " + pi(t)).trim())) ? i : "";
    }
    function pi(t) {
        var i = "";
        return (
            t &&
                t.childNodes &&
                t.childNodes.length &&
                J(t.childNodes, function (t) {
                    var e;
                    if (
                        t &&
                        "span" ===
                            (null == (e = t.tagName) ? void 0 : e.toLowerCase())
                    )
                        try {
                            var r = ti(t);
                            (i = (i + " " + r).trim()),
                                t.childNodes &&
                                    t.childNodes.length &&
                                    (i = (i + " " + pi(t)).trim());
                        } catch (t) {
                            j.error("[AutoCapture]", t);
                        }
                }),
            i
        );
    }
    function gi(t) {
        return (function (t) {
            var i = t.map((t) => {
                var i,
                    e,
                    r = "";
                if ((t.tag_name && (r += t.tag_name), t.attr_class))
                    for (var s of (t.attr_class.sort(), t.attr_class))
                        r += "." + s.replace(/"/g, "");
                var n = q(
                        {},
                        t.text ? { text: t.text } : {},
                        {
                            "nth-child":
                                null !== (i = t.nth_child) && void 0 !== i
                                    ? i
                                    : 0,
                            "nth-of-type":
                                null !== (e = t.nth_of_type) && void 0 !== e
                                    ? e
                                    : 0,
                        },
                        t.href ? { href: t.href } : {},
                        t.attr_id ? { attr_id: t.attr_id } : {},
                        t.attributes
                    ),
                    o = {};
                return (
                    Y(n)
                        .sort((t, i) => {
                            var [e] = t,
                                [r] = i;
                            return e.localeCompare(r);
                        })
                        .forEach((t) => {
                            var [i, e] = t;
                            return (o[_i(i.toString())] = _i(e.toString()));
                        }),
                    (r += ":"),
                    (r += Y(o)
                        .map((t) => {
                            var [i, e] = t;
                            return i + '="' + e + '"';
                        })
                        .join(""))
                );
            });
            return i.join(";");
        })(
            (function (t) {
                return t.map((t) => {
                    var i,
                        e,
                        r = {
                            text:
                                null == (i = t.$el_text)
                                    ? void 0
                                    : i.slice(0, 400),
                            tag_name: t.tag_name,
                            href:
                                null == (e = t.attr__href)
                                    ? void 0
                                    : e.slice(0, 2048),
                            attr_class: mi(t),
                            attr_id: t.attr__id,
                            nth_child: t.nth_child,
                            nth_of_type: t.nth_of_type,
                            attributes: {},
                        };
                    return (
                        Y(t)
                            .filter((t) => {
                                var [i] = t;
                                return 0 === i.indexOf("attr__");
                            })
                            .forEach((t) => {
                                var [i, e] = t;
                                return (r.attributes[i] = e);
                            }),
                        r
                    );
                });
            })(t)
        );
    }
    function _i(t) {
        return t.replace(/"|\\"/g, '\\"');
    }
    function mi(t) {
        var i = t.attr__class;
        return i ? (x(i) ? i : Yt(i)) : void 0;
    }
    class bi {
        constructor() {
            this.clicks = [];
        }
        isRageClick(t, i, e) {
            var r = this.clicks[this.clicks.length - 1];
            if (
                r &&
                Math.abs(t - r.x) + Math.abs(i - r.y) < 30 &&
                e - r.timestamp < 1e3
            ) {
                if (
                    (this.clicks.push({ x: t, y: i, timestamp: e }),
                    3 === this.clicks.length)
                )
                    return !0;
            } else this.clicks = [{ x: t, y: i, timestamp: e }];
            return !1;
        }
    }
    var wi = ["localhost", "127.0.0.1"],
        yi = (t) => {
            var i = null == o ? void 0 : o.createElement("a");
            return R(i) ? null : ((i.href = t), i);
        },
        Si = function (t, i) {
            var e, r;
            void 0 === i && (i = "&");
            var s = [];
            return (
                J(t, function (t, i) {
                    R(t) ||
                        R(i) ||
                        "undefined" === i ||
                        ((e = encodeURIComponent(
                            ((t) => t instanceof File)(t)
                                ? t.name
                                : t.toString()
                        )),
                        (r = encodeURIComponent(i)),
                        (s[s.length] = r + "=" + e));
                }),
                s.join(i)
            );
        },
        $i = function (t, i) {
            for (
                var e,
                    r = ((t.split("#")[0] || "").split(/\?(.*)/)[1] || "")
                        .replace(/^\?+/g, "")
                        .split("&"),
                    s = 0;
                s < r.length;
                s++
            ) {
                var n = r[s].split("=");
                if (n[0] === i) {
                    e = n;
                    break;
                }
            }
            if (!x(e) || e.length < 2) return "";
            var o = e[1];
            try {
                o = decodeURIComponent(o);
            } catch (t) {
                j.error("Skipping decoding for malformed query param: " + o);
            }
            return o.replace(/\+/g, " ");
        },
        ki = function (t, i, e) {
            if (!t || !i || !i.length) return t;
            for (
                var r = t.split("#"),
                    s = r[0] || "",
                    n = r[1],
                    o = s.split("?"),
                    a = o[1],
                    l = o[0],
                    u = (a || "").split("&"),
                    h = [],
                    d = 0;
                d < u.length;
                d++
            ) {
                var v = u[d].split("=");
                x(v) &&
                    (i.includes(v[0]) ? h.push(v[0] + "=" + e) : h.push(u[d]));
            }
            var c = l;
            return (
                null != a && (c += "?" + h.join("&")),
                null != n && (c += "#" + n),
                c
            );
        },
        xi = function (t, i) {
            var e = t.match(new RegExp(i + "=([^&]*)"));
            return e ? e[1] : null;
        },
        Ei = z("[AutoCapture]");
    function Ii(t, i) {
        return i.length > t ? i.slice(0, t) + "..." : i;
    }
    function Pi(t) {
        if (t.previousElementSibling) return t.previousElementSibling;
        var i = t;
        do {
            i = i.previousSibling;
        } while (i && !Gt(i));
        return i;
    }
    function Ri(t, i, e, r) {
        var s = t.tagName.toLowerCase(),
            n = { tag_name: s };
        ei.indexOf(s) > -1 &&
            !e &&
            ("a" === s.toLowerCase() || "button" === s.toLowerCase()
                ? (n.$el_text = Ii(1024, fi(t)))
                : (n.$el_text = Ii(1024, ti(t))));
        var o = Qt(t);
        o.length > 0 &&
            (n.classes = o.filter(function (t) {
                return "" !== t;
            })),
            J(t.attributes, function (e) {
                var s;
                if (
                    (!oi(t) ||
                        -1 !==
                            ["name", "id", "class", "aria-label"].indexOf(
                                e.name
                            )) &&
                    (null == r || !r.includes(e.name)) &&
                    !i &&
                    ci(e.value) &&
                    ((s = e.name),
                    !T(s) ||
                        ("_ngcontent" !== s.substring(0, 10) &&
                            "_nghost" !== s.substring(0, 7)))
                ) {
                    var o = e.value;
                    "class" === e.name && (o = Yt(o).join(" ")),
                        (n["attr__" + e.name] = Ii(1024, o));
                }
            });
        for (var a = 1, l = 1, u = t; (u = Pi(u)); )
            a++, u.tagName === t.tagName && l++;
        return (n.nth_child = a), (n.nth_of_type = l), n;
    }
    function Ti(i, e) {
        for (
            var r,
                s,
                {
                    e: n,
                    maskAllElementAttributes: o,
                    maskAllText: a,
                    elementAttributeIgnoreList: l,
                    elementsChainAsString: u,
                } = e,
                h = [i],
                d = i;
            d.parentNode && !Jt(d, "body");

        )
            Kt(d.parentNode)
                ? (h.push(d.parentNode.host), (d = d.parentNode.host))
                : (h.push(d.parentNode), (d = d.parentNode));
        var v,
            c = [],
            f = {},
            p = !1,
            g = !1;
        if (
            (J(h, (t) => {
                var i = ni(t);
                "a" === t.tagName.toLowerCase() &&
                    ((p = t.getAttribute("href")), (p = i && p && ci(p) && p)),
                    m(Qt(t), "ph-no-capture") && (g = !0),
                    c.push(Ri(t, o, a, l));
                var e = (function (t) {
                    if (!ni(t)) return {};
                    var i = {};
                    return (
                        J(t.attributes, function (t) {
                            if (
                                t.name &&
                                0 ===
                                    t.name.indexOf("data-ph-capture-attribute")
                            ) {
                                var e = t.name.replace(
                                        "data-ph-capture-attribute-",
                                        ""
                                    ),
                                    r = t.value;
                                e && r && ci(r) && (i[e] = r);
                            }
                        }),
                        i
                    );
                })(t);
                V(f, e);
            }),
            g)
        )
            return { props: {}, explicitNoCapture: g };
        if (
            (a ||
                ("a" === i.tagName.toLowerCase() ||
                "button" === i.tagName.toLowerCase()
                    ? (c[0].$el_text = fi(i))
                    : (c[0].$el_text = ti(i))),
            p)
        ) {
            var _, b;
            c[0].attr__href = p;
            var w = null == (_ = yi(p)) ? void 0 : _.host,
                y = null == t || null == (b = t.location) ? void 0 : b.host;
            w && y && w !== y && (v = p);
        }
        return {
            props: V(
                { $event_type: n.type, $ce_version: 1 },
                u ? {} : { $elements: c },
                { $elements_chain: gi(c) },
                null != (r = c[0]) && r.$el_text
                    ? { $el_text: null == (s = c[0]) ? void 0 : s.$el_text }
                    : {},
                v && "click" === n.type ? { $external_click_url: v } : {},
                f
            ),
        };
    }
    class Mi {
        constructor(t) {
            (this.i = !1),
                (this.o = null),
                (this.rageclicks = new bi()),
                (this.h = !1),
                (this.instance = t),
                (this.m = null);
        }
        get S() {
            var t,
                i,
                e = I(this.instance.config.autocapture)
                    ? this.instance.config.autocapture
                    : {};
            return (
                (e.url_allowlist =
                    null == (t = e.url_allowlist)
                        ? void 0
                        : t.map((t) => new RegExp(t))),
                (e.url_ignorelist =
                    null == (i = e.url_ignorelist)
                        ? void 0
                        : i.map((t) => new RegExp(t))),
                e
            );
        }
        $() {
            if (this.isBrowserSupported()) {
                if (t && o) {
                    var i = (i) => {
                        i = i || (null == t ? void 0 : t.event);
                        try {
                            this.k(i);
                        } catch (t) {
                            Ei.error("Failed to capture event", t);
                        }
                    };
                    if (
                        (st(o, "submit", i, { capture: !0 }),
                        st(o, "change", i, { capture: !0 }),
                        st(o, "click", i, { capture: !0 }),
                        this.S.capture_copied_text)
                    ) {
                        var e = (i) => {
                            (i = i || (null == t ? void 0 : t.event)),
                                this.k(i, f);
                        };
                        st(o, "copy", e, { capture: !0 }),
                            st(o, "cut", e, { capture: !0 });
                    }
                }
            } else
                Ei.info(
                    "Disabling Automatic Event Collection because this browser is not supported"
                );
        }
        startIfEnabled() {
            this.isEnabled && !this.i && (this.$(), (this.i = !0));
        }
        onRemoteConfig(t) {
            t.elementsChainAsString && (this.h = t.elementsChainAsString),
                this.instance.persistence &&
                    this.instance.persistence.register({
                        [lt]: !!t.autocapture_opt_out,
                    }),
                (this.o = !!t.autocapture_opt_out),
                this.startIfEnabled();
        }
        setElementSelectors(t) {
            this.m = t;
        }
        getElementSelectors(t) {
            var i,
                e = [];
            return (
                null == (i = this.m) ||
                    i.forEach((i) => {
                        var r = null == o ? void 0 : o.querySelectorAll(i);
                        null == r ||
                            r.forEach((r) => {
                                t === r && e.push(i);
                            });
                    }),
                e
            );
        }
        get isEnabled() {
            var t,
                i,
                e =
                    null == (t = this.instance.persistence)
                        ? void 0
                        : t.props[lt],
                r = this.o;
            if (C(r) && !A(e) && !this.instance.config.advanced_disable_decide)
                return !1;
            var s = null !== (i = this.o) && void 0 !== i ? i : !!e;
            return !!this.instance.config.autocapture && !s;
        }
        k(i, e) {
            if ((void 0 === e && (e = "$autocapture"), this.isEnabled)) {
                var r,
                    s = ii(i);
                if (
                    (Vt(s) && (s = s.parentNode || null),
                    "$autocapture" === e &&
                        "click" === i.type &&
                        i instanceof MouseEvent)
                )
                    this.instance.config.rageclick &&
                        null != (r = this.rageclicks) &&
                        r.isRageClick(
                            i.clientX,
                            i.clientY,
                            new Date().getTime()
                        ) &&
                        this.k(i, "$rageclick");
                var n = e === f;
                if (s && si(s, i, this.S, n, n ? ["copy", "cut"] : void 0)) {
                    var { props: o, explicitNoCapture: a } = Ti(s, {
                        e: i,
                        maskAllElementAttributes:
                            this.instance.config.mask_all_element_attributes,
                        maskAllText: this.instance.config.mask_all_text,
                        elementAttributeIgnoreList:
                            this.S.element_attribute_ignorelist,
                        elementsChainAsString: this.h,
                    });
                    if (a) return !1;
                    var l = this.getElementSelectors(s);
                    if (
                        (l && l.length > 0 && (o.$element_selectors = l),
                        e === f)
                    ) {
                        var u,
                            h = Zt(
                                null == t || null == (u = t.getSelection())
                                    ? void 0
                                    : u.toString()
                            ),
                            d = i.type || "clipboard";
                        if (!h) return !1;
                        (o.$selected_content = h), (o.$copy_type = d);
                    }
                    return this.instance.capture(e, o), !0;
                }
            }
        }
        isBrowserSupported() {
            return E(null == o ? void 0 : o.querySelectorAll);
        }
    }
    Math.trunc ||
        (Math.trunc = function (t) {
            return t < 0 ? Math.ceil(t) : Math.floor(t);
        }),
        Number.isInteger ||
            (Number.isInteger = function (t) {
                return F(t) && isFinite(t) && Math.floor(t) === t;
            });
    var Ci = "0123456789abcdef";
    class Oi {
        constructor(t) {
            if (((this.bytes = t), 16 !== t.length))
                throw new TypeError("not 128-bit length");
        }
        static fromFieldsV7(t, i, e, r) {
            if (
                !Number.isInteger(t) ||
                !Number.isInteger(i) ||
                !Number.isInteger(e) ||
                !Number.isInteger(r) ||
                t < 0 ||
                i < 0 ||
                e < 0 ||
                r < 0 ||
                t > 0xffffffffffff ||
                i > 4095 ||
                e > 1073741823 ||
                r > 4294967295
            )
                throw new RangeError("invalid field value");
            var s = new Uint8Array(16);
            return (
                (s[0] = t / Math.pow(2, 40)),
                (s[1] = t / Math.pow(2, 32)),
                (s[2] = t / Math.pow(2, 24)),
                (s[3] = t / Math.pow(2, 16)),
                (s[4] = t / Math.pow(2, 8)),
                (s[5] = t),
                (s[6] = 112 | (i >>> 8)),
                (s[7] = i),
                (s[8] = 128 | (e >>> 24)),
                (s[9] = e >>> 16),
                (s[10] = e >>> 8),
                (s[11] = e),
                (s[12] = r >>> 24),
                (s[13] = r >>> 16),
                (s[14] = r >>> 8),
                (s[15] = r),
                new Oi(s)
            );
        }
        toString() {
            for (var t = "", i = 0; i < this.bytes.length; i++)
                (t =
                    t +
                    Ci.charAt(this.bytes[i] >>> 4) +
                    Ci.charAt(15 & this.bytes[i])),
                    (3 !== i && 5 !== i && 7 !== i && 9 !== i) || (t += "-");
            if (36 !== t.length)
                throw new Error("Invalid UUIDv7 was generated");
            return t;
        }
        clone() {
            return new Oi(this.bytes.slice(0));
        }
        equals(t) {
            return 0 === this.compareTo(t);
        }
        compareTo(t) {
            for (var i = 0; i < 16; i++) {
                var e = this.bytes[i] - t.bytes[i];
                if (0 !== e) return Math.sign(e);
            }
            return 0;
        }
    }
    class Fi {
        constructor() {
            (this.I = 0), (this.P = 0), (this.R = new Li());
        }
        generate() {
            var t = this.generateOrAbort();
            if (R(t)) {
                this.I = 0;
                var i = this.generateOrAbort();
                if (R(i))
                    throw new Error(
                        "Could not generate UUID after timestamp reset"
                    );
                return i;
            }
            return t;
        }
        generateOrAbort() {
            var t = Date.now();
            if (t > this.I) (this.I = t), this.T();
            else {
                if (!(t + 1e4 > this.I)) return;
                this.P++, this.P > 4398046511103 && (this.I++, this.T());
            }
            return Oi.fromFieldsV7(
                this.I,
                Math.trunc(this.P / Math.pow(2, 30)),
                this.P & (Math.pow(2, 30) - 1),
                this.R.nextUint32()
            );
        }
        T() {
            this.P = 1024 * this.R.nextUint32() + (1023 & this.R.nextUint32());
        }
    }
    var Ai,
        Di = (t) => {
            if (
                "undefined" != typeof UUIDV7_DENY_WEAK_RNG &&
                UUIDV7_DENY_WEAK_RNG
            )
                throw new Error("no cryptographically strong RNG available");
            for (var i = 0; i < t.length; i++)
                t[i] =
                    65536 * Math.trunc(65536 * Math.random()) +
                    Math.trunc(65536 * Math.random());
            return t;
        };
    t &&
        !R(t.crypto) &&
        crypto.getRandomValues &&
        (Di = (t) => crypto.getRandomValues(t));
    class Li {
        constructor() {
            (this.M = new Uint32Array(8)), (this.C = 1 / 0);
        }
        nextUint32() {
            return (
                this.C >= this.M.length && (Di(this.M), (this.C = 0)),
                this.M[this.C++]
            );
        }
    }
    var Ni = () => ji().toString(),
        ji = () => (Ai || (Ai = new Fi())).generate(),
        zi = "";
    var Ui = /[a-z0-9][a-z0-9-]+\.[a-z]{2,}$/i;
    function Bi(t, i) {
        if (i) {
            var e = (function (t, i) {
                if ((void 0 === i && (i = o), zi)) return zi;
                if (!i) return "";
                if (["localhost", "127.0.0.1"].includes(t)) return "";
                for (
                    var e = t.split("."),
                        r = Math.min(e.length, 8),
                        s = "dmn_chk_" + Ni();
                    !zi && r--;

                ) {
                    var n = e.slice(r).join("."),
                        a = s + "=1;domain=." + n + ";path=/";
                    (i.cookie = a + ";max-age=3"),
                        i.cookie.includes(s) &&
                            ((i.cookie = a + ";max-age=0"), (zi = n));
                }
                return zi;
            })(t);
            if (!e) {
                var r = ((t) => {
                    var i = t.match(Ui);
                    return i ? i[0] : "";
                })(t);
                r !== e &&
                    j.info(
                        "Warning: cookie subdomain discovery mismatch",
                        r,
                        e
                    ),
                    (e = r);
            }
            return e ? "; domain=." + e : "";
        }
        return "";
    }
    var qi = {
            O: () => !!o,
            F: function (t) {
                j.error("cookieStore error: " + t);
            },
            A: function (t) {
                if (o) {
                    try {
                        for (
                            var i = t + "=",
                                e = o.cookie.split(";").filter((t) => t.length),
                                r = 0;
                            r < e.length;
                            r++
                        ) {
                            for (var s = e[r]; " " == s.charAt(0); )
                                s = s.substring(1, s.length);
                            if (0 === s.indexOf(i))
                                return decodeURIComponent(
                                    s.substring(i.length, s.length)
                                );
                        }
                    } catch (t) {}
                    return null;
                }
            },
            D: function (t) {
                var i;
                try {
                    i = JSON.parse(qi.A(t)) || {};
                } catch (t) {}
                return i;
            },
            L: function (t, i, e, r, s) {
                if (o)
                    try {
                        var n = "",
                            a = "",
                            l = Bi(o.location.hostname, r);
                        if (e) {
                            var u = new Date();
                            u.setTime(u.getTime() + 24 * e * 60 * 60 * 1e3),
                                (n = "; expires=" + u.toUTCString());
                        }
                        s && (a = "; secure");
                        var h =
                            t +
                            "=" +
                            encodeURIComponent(JSON.stringify(i)) +
                            n +
                            "; SameSite=Lax; path=/" +
                            l +
                            a;
                        return (
                            h.length > 3686.4 &&
                                j.warn(
                                    "cookieStore warning: large cookie, len=" +
                                        h.length
                                ),
                            (o.cookie = h),
                            h
                        );
                    } catch (t) {
                        return;
                    }
            },
            N: function (t, i) {
                try {
                    qi.L(t, "", -1, i);
                } catch (t) {
                    return;
                }
            },
        },
        Hi = null,
        Wi = {
            O: function () {
                if (!C(Hi)) return Hi;
                var i = !0;
                if (R(t)) i = !1;
                else
                    try {
                        var e = "__mplssupport__";
                        Wi.L(e, "xyz"),
                            '"xyz"' !== Wi.A(e) && (i = !1),
                            Wi.N(e);
                    } catch (t) {
                        i = !1;
                    }
                return (
                    i ||
                        j.error(
                            "localStorage unsupported; falling back to cookie store"
                        ),
                    (Hi = i),
                    i
                );
            },
            F: function (t) {
                j.error("localStorage error: " + t);
            },
            A: function (i) {
                try {
                    return null == t ? void 0 : t.localStorage.getItem(i);
                } catch (t) {
                    Wi.F(t);
                }
                return null;
            },
            D: function (t) {
                try {
                    return JSON.parse(Wi.A(t)) || {};
                } catch (t) {}
                return null;
            },
            L: function (i, e) {
                try {
                    null == t || t.localStorage.setItem(i, JSON.stringify(e));
                } catch (t) {
                    Wi.F(t);
                }
            },
            N: function (i) {
                try {
                    null == t || t.localStorage.removeItem(i);
                } catch (t) {
                    Wi.F(t);
                }
            },
        },
        Gi = ["distinct_id", $t, kt, Ut, zt],
        Ji = q({}, Wi, {
            D: function (t) {
                try {
                    var i = {};
                    try {
                        i = qi.D(t) || {};
                    } catch (t) {}
                    var e = V(i, JSON.parse(Wi.A(t) || "{}"));
                    return Wi.L(t, e), e;
                } catch (t) {}
                return null;
            },
            L: function (t, i, e, r, s, n) {
                try {
                    Wi.L(t, i, void 0, void 0, n);
                    var o = {};
                    Gi.forEach((t) => {
                        i[t] && (o[t] = i[t]);
                    }),
                        Object.keys(o).length && qi.L(t, o, e, r, s, n);
                } catch (t) {
                    Wi.F(t);
                }
            },
            N: function (i, e) {
                try {
                    null == t || t.localStorage.removeItem(i), qi.N(i, e);
                } catch (t) {
                    Wi.F(t);
                }
            },
        }),
        Vi = {},
        Ki = {
            O: function () {
                return !0;
            },
            F: function (t) {
                j.error("memoryStorage error: " + t);
            },
            A: function (t) {
                return Vi[t] || null;
            },
            D: function (t) {
                return Vi[t] || null;
            },
            L: function (t, i) {
                Vi[t] = i;
            },
            N: function (t) {
                delete Vi[t];
            },
        },
        Yi = null,
        Xi = {
            O: function () {
                if (!C(Yi)) return Yi;
                if (((Yi = !0), R(t))) Yi = !1;
                else
                    try {
                        var i = "__support__";
                        Xi.L(i, "xyz"),
                            '"xyz"' !== Xi.A(i) && (Yi = !1),
                            Xi.N(i);
                    } catch (t) {
                        Yi = !1;
                    }
                return Yi;
            },
            F: function (t) {
                j.error("sessionStorage error: ", t);
            },
            A: function (i) {
                try {
                    return null == t ? void 0 : t.sessionStorage.getItem(i);
                } catch (t) {
                    Xi.F(t);
                }
                return null;
            },
            D: function (t) {
                try {
                    return JSON.parse(Xi.A(t)) || null;
                } catch (t) {}
                return null;
            },
            L: function (i, e) {
                try {
                    null == t || t.sessionStorage.setItem(i, JSON.stringify(e));
                } catch (t) {
                    Xi.F(t);
                }
            },
            N: function (i) {
                try {
                    null == t || t.sessionStorage.removeItem(i);
                } catch (t) {
                    Xi.F(t);
                }
            },
        },
        Qi = (function (t) {
            return (
                (t[(t.PENDING = -1)] = "PENDING"),
                (t[(t.DENIED = 0)] = "DENIED"),
                (t[(t.GRANTED = 1)] = "GRANTED"),
                t
            );
        })({});
    class Zi {
        constructor(t) {
            this._instance = t;
        }
        get S() {
            return this._instance.config;
        }
        get consent() {
            return this.j() ? Qi.DENIED : this.U;
        }
        isOptedOut() {
            return (
                this.consent === Qi.DENIED ||
                (this.consent === Qi.PENDING &&
                    this.S.opt_out_capturing_by_default)
            );
        }
        isOptedIn() {
            return !this.isOptedOut();
        }
        optInOut(t) {
            this.B.L(
                this.q,
                t ? 1 : 0,
                this.S.cookie_expiration,
                this.S.cross_subdomain_cookie,
                this.S.secure_cookie
            );
        }
        reset() {
            this.B.N(this.q, this.S.cross_subdomain_cookie);
        }
        get q() {
            var { token: t, opt_out_capturing_cookie_prefix: i } =
                this._instance.config;
            return (i || "__ph_opt_in_out_") + t;
        }
        get U() {
            var t = this.B.A(this.q);
            return "1" === t ? Qi.GRANTED : "0" === t ? Qi.DENIED : Qi.PENDING;
        }
        get B() {
            if (!this.H) {
                var t = this.S.opt_out_capturing_persistence_type;
                this.H = "localStorage" === t ? Wi : qi;
                var i = "localStorage" === t ? qi : Wi;
                i.A(this.q) &&
                    (this.H.A(this.q) || this.optInOut("1" === i.A(this.q)),
                    i.N(this.q, this.S.cross_subdomain_cookie));
            }
            return this.H;
        }
        j() {
            return (
                !!this.S.respect_dnt &&
                !!rt(
                    [
                        null == n ? void 0 : n.doNotTrack,
                        null == n ? void 0 : n.msDoNotTrack,
                        v.doNotTrack,
                    ],
                    (t) => m([!0, 1, "1", "yes"], t)
                )
            );
        }
    }
    var te = z("[Dead Clicks]"),
        ie = () => !0,
        ee = (t) => {
            var i,
                e = !(
                    null == (i = t.instance.persistence) || !i.get_property(ct)
                ),
                r = t.instance.config.capture_dead_clicks;
            return A(r) ? r : e;
        };
    class re {
        get lazyLoadedDeadClicksAutocapture() {
            return this.W;
        }
        constructor(t, i, e) {
            (this.instance = t),
                (this.isEnabled = i),
                (this.onCapture = e),
                this.startIfEnabled();
        }
        onRemoteConfig(t) {
            this.instance.persistence &&
                this.instance.persistence.register({
                    [ct]: null == t ? void 0 : t.captureDeadClicks,
                }),
                this.startIfEnabled();
        }
        startIfEnabled() {
            this.isEnabled(this) &&
                this.G(() => {
                    this.J();
                });
        }
        G(t) {
            var i, e;
            null != (i = v.__PosthogExtensions__) &&
                i.initDeadClicksAutocapture &&
                t(),
                null == (e = v.__PosthogExtensions__) ||
                    null == e.loadExternalDependency ||
                    e.loadExternalDependency(
                        this.instance,
                        "dead-clicks-autocapture",
                        (i) => {
                            i ? te.error("failed to load script", i) : t();
                        }
                    );
        }
        J() {
            var t;
            if (o) {
                if (
                    !this.W &&
                    null != (t = v.__PosthogExtensions__) &&
                    t.initDeadClicksAutocapture
                ) {
                    var i = I(this.instance.config.capture_dead_clicks)
                        ? this.instance.config.capture_dead_clicks
                        : {};
                    (i.__onCapture = this.onCapture),
                        (this.W =
                            v.__PosthogExtensions__.initDeadClicksAutocapture(
                                this.instance,
                                i
                            )),
                        this.W.start(o),
                        te.info("starting...");
                }
            } else te.error("`document` not found. Cannot start.");
        }
        stop() {
            this.W &&
                (this.W.stop(), (this.W = void 0), te.info("stopping..."));
        }
    }
    var se = z("[ExceptionAutocapture]");
    class ne {
        constructor(i) {
            var e;
            (this.V = () => {
                var i;
                if (
                    t &&
                    this.isEnabled &&
                    null != (i = v.__PosthogExtensions__) &&
                    i.errorWrappingFunctions
                ) {
                    var e =
                            v.__PosthogExtensions__.errorWrappingFunctions
                                .wrapOnError,
                        r =
                            v.__PosthogExtensions__.errorWrappingFunctions
                                .wrapUnhandledRejection,
                        s =
                            v.__PosthogExtensions__.errorWrappingFunctions
                                .wrapConsoleError;
                    try {
                        !this.K &&
                            this.S.capture_unhandled_errors &&
                            (this.K = e(this.captureException.bind(this))),
                            !this.Y &&
                                this.S.capture_unhandled_rejections &&
                                (this.Y = r(this.captureException.bind(this))),
                            !this.X &&
                                this.S.capture_console_errors &&
                                (this.X = s(this.captureException.bind(this)));
                    } catch (t) {
                        se.error("failed to start", t), this.Z();
                    }
                }
            }),
                (this._instance = i),
                (this.tt = !(
                    null == (e = this._instance.persistence) || !e.props[ht]
                )),
                (this.S = this.it()),
                this.startIfEnabled();
        }
        it() {
            var t = this._instance.config.capture_exceptions,
                i = {
                    capture_unhandled_errors: !1,
                    capture_unhandled_rejections: !1,
                    capture_console_errors: !1,
                };
            return (
                I(t)
                    ? (i = q({}, i, t))
                    : (R(t) ? this.tt : t) &&
                      (i = q({}, i, {
                          capture_unhandled_errors: !0,
                          capture_unhandled_rejections: !0,
                      })),
                i
            );
        }
        get isEnabled() {
            return (
                this.S.capture_console_errors ||
                this.S.capture_unhandled_errors ||
                this.S.capture_unhandled_rejections
            );
        }
        startIfEnabled() {
            this.isEnabled && (se.info("enabled"), this.G(this.V));
        }
        G(t) {
            var i, e;
            null != (i = v.__PosthogExtensions__) &&
                i.errorWrappingFunctions &&
                t(),
                null == (e = v.__PosthogExtensions__) ||
                    null == e.loadExternalDependency ||
                    e.loadExternalDependency(
                        this._instance,
                        "exception-autocapture",
                        (i) => {
                            if (i) return se.error("failed to load script", i);
                            t();
                        }
                    );
        }
        Z() {
            var t, i, e;
            null == (t = this.K) || t.call(this),
                (this.K = void 0),
                null == (i = this.Y) || i.call(this),
                (this.Y = void 0),
                null == (e = this.X) || e.call(this),
                (this.X = void 0);
        }
        onRemoteConfig(t) {
            var i = t.autocaptureExceptions;
            (this.tt = !!i || !1),
                (this.S = this.it()),
                this._instance.persistence &&
                    this._instance.persistence.register({ [ht]: this.tt }),
                this.startIfEnabled();
        }
        captureException(t) {
            var i = this._instance.requestRouter.endpointFor("ui");
            (t.$exception_personURL =
                i +
                "/project/" +
                this._instance.config.token +
                "/person/" +
                this._instance.get_distinct_id()),
                this._instance.exceptions.sendExceptionEvent(t);
        }
    }
    function oe(t) {
        return !R(Event) && ae(t, Event);
    }
    function ae(t, i) {
        try {
            return t instanceof i;
        } catch (t) {
            return !1;
        }
    }
    function le(t) {
        switch (Object.prototype.toString.call(t)) {
            case "[object Error]":
            case "[object Exception]":
            case "[object DOMException]":
            case "[object DOMError]":
                return !0;
            default:
                return ae(t, Error);
        }
    }
    function ue(t, i) {
        return Object.prototype.toString.call(t) === "[object " + i + "]";
    }
    function he(t) {
        return ue(t, "DOMError");
    }
    var de = /\(error: (.*)\)/,
        ve = 50,
        ce = "?";
    function fe(t, i, e, r) {
        var s = {
            platform: "web:javascript",
            filename: t,
            function: "<anonymous>" === i ? ce : i,
            in_app: !0,
        };
        return R(e) || (s.lineno = e), R(r) || (s.colno = r), s;
    }
    var pe = /^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i,
        ge =
            /^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
        _e = /\((\S*)(?::(\d+))(?::(\d+))\)/,
        me =
            /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,
        be = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i,
        we = (function () {
            for (var t = arguments.length, i = new Array(t), e = 0; e < t; e++)
                i[e] = arguments[e];
            var r = i.sort((t, i) => t[0] - i[0]).map((t) => t[1]);
            return function (t, i) {
                void 0 === i && (i = 0);
                for (var e = [], s = t.split("\n"), n = i; n < s.length; n++) {
                    var o = s[n];
                    if (!(o.length > 1024)) {
                        var a = de.test(o) ? o.replace(de, "$1") : o;
                        if (!a.match(/\S*Error: /)) {
                            for (var l of r) {
                                var u = l(a);
                                if (u) {
                                    e.push(u);
                                    break;
                                }
                            }
                            if (e.length >= ve) break;
                        }
                    }
                }
                return (function (t) {
                    if (!t.length) return [];
                    var i = Array.from(t);
                    return (
                        i.reverse(),
                        i
                            .slice(0, ve)
                            .map((t) =>
                                q({}, t, {
                                    filename: t.filename || ye(i).filename,
                                    function: t.function || ce,
                                })
                            )
                    );
                })(e);
            };
        })(
            ...[
                [
                    30,
                    (t) => {
                        var i = pe.exec(t);
                        if (i) {
                            var [, e, r, s] = i;
                            return fe(e, ce, +r, +s);
                        }
                        var n = ge.exec(t);
                        if (n) {
                            if (n[2] && 0 === n[2].indexOf("eval")) {
                                var o = _e.exec(n[2]);
                                o &&
                                    ((n[2] = o[1]),
                                    (n[3] = o[2]),
                                    (n[4] = o[3]));
                            }
                            var [a, l] = xe(n[1] || ce, n[2]);
                            return fe(
                                l,
                                a,
                                n[3] ? +n[3] : void 0,
                                n[4] ? +n[4] : void 0
                            );
                        }
                    },
                ],
                [
                    50,
                    (t) => {
                        var i = me.exec(t);
                        if (i) {
                            if (i[3] && i[3].indexOf(" > eval") > -1) {
                                var e = be.exec(i[3]);
                                e &&
                                    ((i[1] = i[1] || "eval"),
                                    (i[3] = e[1]),
                                    (i[4] = e[2]),
                                    (i[5] = ""));
                            }
                            var r = i[3],
                                s = i[1] || ce;
                            return (
                                ([s, r] = xe(s, r)),
                                fe(
                                    r,
                                    s,
                                    i[4] ? +i[4] : void 0,
                                    i[5] ? +i[5] : void 0
                                )
                            );
                        }
                    },
                ],
            ]
        );
    function ye(t) {
        return t[t.length - 1] || {};
    }
    var Se,
        $e,
        ke,
        xe = (t, i) => {
            var e = -1 !== t.indexOf("safari-extension"),
                r = -1 !== t.indexOf("safari-web-extension");
            return e || r
                ? [
                      -1 !== t.indexOf("@") ? t.split("@")[0] : ce,
                      e ? "safari-extension:" + i : "safari-web-extension:" + i,
                  ]
                : [t, i];
        };
    var Ee =
        /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i;
    function Ie(t, i) {
        void 0 === i && (i = 0);
        var e = t.stacktrace || t.stack || "",
            r = (function (t) {
                if (t && Pe.test(t.message)) return 1;
                return 0;
            })(t);
        try {
            var s = we,
                n = (function (t, i) {
                    var e = (function (t) {
                        var i = globalThis._posthogChunkIds;
                        if (!i) return {};
                        var e = Object.keys(i);
                        return (
                            (ke && e.length === $e) ||
                                (($e = e.length),
                                (ke = e.reduce((e, r) => {
                                    Se || (Se = {});
                                    var s = Se[r];
                                    if (s) e[s[0]] = s[1];
                                    else
                                        for (
                                            var n = t(r), o = n.length - 1;
                                            o >= 0;
                                            o--
                                        ) {
                                            var a = n[o],
                                                l =
                                                    null == a
                                                        ? void 0
                                                        : a.filename,
                                                u = i[r];
                                            if (l && u) {
                                                (e[l] = u), (Se[r] = [l, u]);
                                                break;
                                            }
                                        }
                                    return e;
                                }, {}))),
                            ke
                        );
                    })(i);
                    return (
                        t.forEach((t) => {
                            t.filename && (t.chunk_id = e[t.filename]);
                        }),
                        t
                    );
                })(s(e, r), s);
            return n.slice(0, n.length - i);
        } catch (t) {}
        return [];
    }
    var Pe = /Minified React error #\d+;/i;
    function Re(t, i) {
        var e,
            r,
            s = Ie(t),
            n =
                null === (e = null == i ? void 0 : i.handled) ||
                void 0 === e ||
                e,
            o =
                null !== (r = null == i ? void 0 : i.synthetic) &&
                void 0 !== r &&
                r;
        return {
            type:
                null != i && i.overrideExceptionType
                    ? i.overrideExceptionType
                    : t.name,
            value: (function (t) {
                var i = t.message;
                if (i.error && "string" == typeof i.error.message)
                    return String(i.error.message);
                return String(i);
            })(t),
            stacktrace: { frames: s, type: "raw" },
            mechanism: { handled: n, synthetic: o },
        };
    }
    function Te(t, i) {
        var e = Re(t, i);
        return t.cause && le(t.cause) && t.cause !== t
            ? [
                  e,
                  ...Te(t.cause, {
                      handled: null == i ? void 0 : i.handled,
                      synthetic: null == i ? void 0 : i.synthetic,
                  }),
              ]
            : [e];
    }
    function Me(t, i) {
        return { $exception_list: Te(t, i), $exception_level: "error" };
    }
    function Ce(t, i) {
        var e,
            r,
            s,
            n =
                null === (e = null == i ? void 0 : i.handled) ||
                void 0 === e ||
                e,
            o =
                null === (r = null == i ? void 0 : i.synthetic) ||
                void 0 === r ||
                r,
            a = {
                type:
                    null != i && i.overrideExceptionType
                        ? i.overrideExceptionType
                        : null !==
                              (s =
                                  null == i
                                      ? void 0
                                      : i.defaultExceptionType) && void 0 !== s
                        ? s
                        : "Error",
                value: t || (null == i ? void 0 : i.defaultExceptionMessage),
                mechanism: { handled: n, synthetic: o },
            };
        if (null != i && i.syntheticException) {
            var l = Ie(i.syntheticException, 1);
            l.length && (a.stacktrace = { frames: l, type: "raw" });
        }
        return { $exception_list: [a], $exception_level: "error" };
    }
    function Oe(t) {
        return T(t) && !M(t) && _.indexOf(t) >= 0;
    }
    function Fe(t, i) {
        var e,
            r,
            s =
                null === (e = null == i ? void 0 : i.handled) ||
                void 0 === e ||
                e,
            n =
                null === (r = null == i ? void 0 : i.synthetic) ||
                void 0 === r ||
                r,
            o =
                null != i && i.overrideExceptionType
                    ? i.overrideExceptionType
                    : oe(t)
                    ? t.constructor.name
                    : "Error",
            a =
                "Non-Error 'exception' captured with keys: " +
                (function (t, i) {
                    void 0 === i && (i = 40);
                    var e = Object.keys(t);
                    if ((e.sort(), !e.length)) return "[object has no keys]";
                    for (var r = e.length; r > 0; r--) {
                        var s = e.slice(0, r).join(", ");
                        if (!(s.length > i))
                            return r === e.length || s.length <= i
                                ? s
                                : s.slice(0, i) + "...";
                    }
                    return "";
                })(t),
            l = { type: o, value: a, mechanism: { handled: s, synthetic: n } };
        if (null != i && i.syntheticException) {
            var u = Ie(null == i ? void 0 : i.syntheticException, 1);
            u.length && (l.stacktrace = { frames: u, type: "raw" });
        }
        return {
            $exception_list: [l],
            $exception_level: Oe(t.level) ? t.level : "error",
        };
    }
    function Ae(t, i) {
        var { error: e, event: r } = t,
            s = { $exception_list: [] },
            n = e || r;
        if (
            he(n) ||
            (function (t) {
                return ue(t, "DOMException");
            })(n)
        ) {
            var o = n;
            if (
                (function (t) {
                    return "stack" in t;
                })(n)
            )
                s = Me(n, i);
            else {
                var a = o.name || (he(o) ? "DOMError" : "DOMException"),
                    l = o.message ? a + ": " + o.message : a;
                s = Ce(
                    l,
                    q({}, i, {
                        overrideExceptionType: he(o)
                            ? "DOMError"
                            : "DOMException",
                        defaultExceptionMessage: l,
                    })
                );
            }
            return (
                "code" in o && (s.$exception_DOMException_code = "" + o.code), s
            );
        }
        if (
            (function (t) {
                return ue(t, "ErrorEvent");
            })(n) &&
            n.error
        )
            return Me(n.error, i);
        if (le(n)) return Me(n, i);
        if (
            (function (t) {
                return ue(t, "Object");
            })(n) ||
            oe(n)
        )
            return Fe(n, i);
        if (R(e) && T(r)) {
            var u = "Error",
                h = r,
                d = r.match(Ee);
            return (
                d && ((u = d[1]), (h = d[2])),
                Ce(
                    h,
                    q({}, i, {
                        overrideExceptionType: u,
                        defaultExceptionMessage: h,
                    })
                )
            );
        }
        return Ce(n, i);
    }
    function De(t, i, e) {
        try {
            if (!(i in t)) return () => {};
            var r = t[i],
                s = e(r);
            return (
                E(s) &&
                    ((s.prototype = s.prototype || {}),
                    Object.defineProperties(s, {
                        __posthog_wrapped__: { enumerable: !1, value: !0 },
                    })),
                (t[i] = s),
                () => {
                    t[i] = r;
                }
            );
        } catch (t) {
            return () => {};
        }
    }
    class Le {
        constructor(i) {
            var e;
            (this._instance = i),
                (this.et =
                    (null == t || null == (e = t.location)
                        ? void 0
                        : e.pathname) || "");
        }
        get isEnabled() {
            return "history_change" === this._instance.config.capture_pageview;
        }
        startIfEnabled() {
            this.isEnabled &&
                (j.info("History API monitoring enabled, starting..."),
                this.monitorHistoryChanges());
        }
        stop() {
            this.rt && this.rt(),
                (this.rt = void 0),
                j.info("History API monitoring stopped");
        }
        monitorHistoryChanges() {
            var i, e;
            if (t && t.history) {
                var r = this;
                (null != (i = t.history.pushState) && i.__posthog_wrapped__) ||
                    De(
                        t.history,
                        "pushState",
                        (t) =>
                            function (i, e, s) {
                                t.call(this, i, e, s), r.st("pushState");
                            }
                    ),
                    (null != (e = t.history.replaceState) &&
                        e.__posthog_wrapped__) ||
                        De(
                            t.history,
                            "replaceState",
                            (t) =>
                                function (i, e, s) {
                                    t.call(this, i, e, s), r.st("replaceState");
                                }
                        ),
                    this.nt();
            }
        }
        st(i) {
            try {
                var e,
                    r =
                        null == t || null == (e = t.location)
                            ? void 0
                            : e.pathname;
                if (!r) return;
                r !== this.et &&
                    this.isEnabled &&
                    this._instance.capture("$pageview", { navigation_type: i }),
                    (this.et = r);
            } catch (t) {
                j.error("Error capturing " + i + " pageview", t);
            }
        }
        nt() {
            if (!this.rt) {
                var i = () => {
                    this.st("popstate");
                };
                st(t, "popstate", i),
                    (this.rt = () => {
                        t && t.removeEventListener("popstate", i);
                    });
            }
        }
    }
    function Ne(t) {
        var i, e;
        return (
            (null ==
            (i = JSON.stringify(
                t,
                ((e = []),
                function (t, i) {
                    if (I(i)) {
                        for (; e.length > 0 && e[e.length - 1] !== this; )
                            e.pop();
                        return e.includes(i) ? "[Circular]" : (e.push(i), i);
                    }
                    return i;
                })
            ))
                ? void 0
                : i.length) || 0
        );
    }
    function je(t, i) {
        if (
            (void 0 === i && (i = 6606028.8), t.size >= i && t.data.length > 1)
        ) {
            var e = Math.floor(t.data.length / 2),
                r = t.data.slice(0, e),
                s = t.data.slice(e);
            return [
                je({
                    size: Ne(r),
                    data: r,
                    sessionId: t.sessionId,
                    windowId: t.windowId,
                }),
                je({
                    size: Ne(s),
                    data: s,
                    sessionId: t.sessionId,
                    windowId: t.windowId,
                }),
            ].flatMap((t) => t);
        }
        return [t];
    }
    var ze = ((t) => (
            (t[(t.DomContentLoaded = 0)] = "DomContentLoaded"),
            (t[(t.Load = 1)] = "Load"),
            (t[(t.FullSnapshot = 2)] = "FullSnapshot"),
            (t[(t.IncrementalSnapshot = 3)] = "IncrementalSnapshot"),
            (t[(t.Meta = 4)] = "Meta"),
            (t[(t.Custom = 5)] = "Custom"),
            (t[(t.Plugin = 6)] = "Plugin"),
            t
        ))(ze || {}),
        Ue = ((t) => (
            (t[(t.Mutation = 0)] = "Mutation"),
            (t[(t.MouseMove = 1)] = "MouseMove"),
            (t[(t.MouseInteraction = 2)] = "MouseInteraction"),
            (t[(t.Scroll = 3)] = "Scroll"),
            (t[(t.ViewportResize = 4)] = "ViewportResize"),
            (t[(t.Input = 5)] = "Input"),
            (t[(t.TouchMove = 6)] = "TouchMove"),
            (t[(t.MediaInteraction = 7)] = "MediaInteraction"),
            (t[(t.StyleSheetRule = 8)] = "StyleSheetRule"),
            (t[(t.CanvasMutation = 9)] = "CanvasMutation"),
            (t[(t.Font = 10)] = "Font"),
            (t[(t.Log = 11)] = "Log"),
            (t[(t.Drag = 12)] = "Drag"),
            (t[(t.StyleDeclaration = 13)] = "StyleDeclaration"),
            (t[(t.Selection = 14)] = "Selection"),
            (t[(t.AdoptedStyleSheet = 15)] = "AdoptedStyleSheet"),
            (t[(t.CustomElement = 16)] = "CustomElement"),
            t
        ))(Ue || {}),
        Be = "[SessionRecording]",
        qe = "redacted",
        He = {
            initiatorTypes: [
                "audio",
                "beacon",
                "body",
                "css",
                "early-hint",
                "embed",
                "fetch",
                "frame",
                "iframe",
                "icon",
                "image",
                "img",
                "input",
                "link",
                "navigation",
                "object",
                "ping",
                "script",
                "track",
                "video",
                "xmlhttprequest",
            ],
            maskRequestFn: (t) => t,
            recordHeaders: !1,
            recordBody: !1,
            recordInitialRequests: !1,
            recordPerformance: !1,
            performanceEntryTypeToObserve: [
                "first-input",
                "navigation",
                "paint",
                "resource",
            ],
            payloadSizeLimitBytes: 1e6,
            payloadHostDenyList: [
                ".lr-ingest.io",
                ".ingest.sentry.io",
                ".clarity.ms",
                "analytics.google.com",
                "bam.nr-data.net",
            ],
        },
        We = [
            "authorization",
            "x-forwarded-for",
            "authorization",
            "cookie",
            "set-cookie",
            "x-api-key",
            "x-real-ip",
            "remote-addr",
            "forwarded",
            "proxy-authorization",
            "x-csrf-token",
            "x-csrftoken",
            "x-xsrf-token",
        ],
        Ge = [
            "password",
            "secret",
            "passwd",
            "api_key",
            "apikey",
            "auth",
            "credentials",
            "mysql_pwd",
            "privatekey",
            "private_key",
            "token",
        ],
        Je = ["/s/", "/e/", "/i/"];
    function Ve(t, i, e, r) {
        if (O(t)) return t;
        var s =
            (null == i ? void 0 : i["content-length"]) ||
            (function (t) {
                return new Blob([t]).size;
            })(t);
        return (
            T(s) && (s = parseInt(s)),
            s > e
                ? Be + " " + r + " body too large to record (" + s + " bytes)"
                : t
        );
    }
    function Ke(t, i) {
        if (O(t)) return t;
        var e = t;
        return (
            ci(e, !1) || (e = Be + " " + i + " body " + qe),
            J(Ge, (t) => {
                var r, s;
                null != (r = e) &&
                    r.length &&
                    -1 !== (null == (s = e) ? void 0 : s.indexOf(t)) &&
                    (e =
                        Be +
                        " " +
                        i +
                        " body " +
                        qe +
                        " as might contain: " +
                        t);
            }),
            e
        );
    }
    var Ye = (t, i) => {
        var e,
            r,
            s,
            n = {
                payloadSizeLimitBytes: He.payloadSizeLimitBytes,
                performanceEntryTypeToObserve: [
                    ...He.performanceEntryTypeToObserve,
                ],
                payloadHostDenyList: [
                    ...(i.payloadHostDenyList || []),
                    ...He.payloadHostDenyList,
                ],
            },
            o = !1 !== t.session_recording.recordHeaders && i.recordHeaders,
            a = !1 !== t.session_recording.recordBody && i.recordBody,
            l = !1 !== t.capture_performance && i.recordPerformance,
            u =
                ((e = n),
                (s = Math.min(
                    1e6,
                    null !== (r = e.payloadSizeLimitBytes) && void 0 !== r
                        ? r
                        : 1e6
                )),
                (t) => (
                    null != t &&
                        t.requestBody &&
                        (t.requestBody = Ve(
                            t.requestBody,
                            t.requestHeaders,
                            s,
                            "Request"
                        )),
                    null != t &&
                        t.responseBody &&
                        (t.responseBody = Ve(
                            t.responseBody,
                            t.responseHeaders,
                            s,
                            "Response"
                        )),
                    t
                )),
            h = (i) => {
                return u(
                    ((t, i) => {
                        var e,
                            r = yi(t.name),
                            s =
                                0 === i.indexOf("http")
                                    ? null == (e = yi(i))
                                        ? void 0
                                        : e.pathname
                                    : i;
                        "/" === s && (s = "");
                        var n =
                            null == r
                                ? void 0
                                : r.pathname.replace(s || "", "");
                        if (!(r && n && Je.some((t) => 0 === n.indexOf(t))))
                            return t;
                    })(
                        ((r = (e = i).requestHeaders),
                        O(r) ||
                            J(Object.keys(null != r ? r : {}), (t) => {
                                We.includes(t.toLowerCase()) && (r[t] = qe);
                            }),
                        e),
                        t.api_host
                    )
                );
                var e, r;
            },
            d = E(t.session_recording.maskNetworkRequestFn);
        return (
            d &&
                E(t.session_recording.maskCapturedNetworkRequestFn) &&
                j.warn(
                    "Both `maskNetworkRequestFn` and `maskCapturedNetworkRequestFn` are defined. `maskNetworkRequestFn` will be ignored."
                ),
            d &&
                (t.session_recording.maskCapturedNetworkRequestFn = (i) => {
                    var e = t.session_recording.maskNetworkRequestFn({
                        url: i.name,
                    });
                    return q({}, i, { name: null == e ? void 0 : e.url });
                }),
            (n.maskRequestFn = E(
                t.session_recording.maskCapturedNetworkRequestFn
            )
                ? (i) => {
                      var e,
                          r = h(i);
                      return r &&
                          null !==
                              (e =
                                  null ==
                                  t.session_recording
                                      .maskCapturedNetworkRequestFn
                                      ? void 0
                                      : t.session_recording.maskCapturedNetworkRequestFn(
                                            r
                                        )) &&
                          void 0 !== e
                          ? e
                          : void 0;
                  }
                : (t) =>
                      (function (t) {
                          if (!R(t))
                              return (
                                  (t.requestBody = Ke(
                                      t.requestBody,
                                      "Request"
                                  )),
                                  (t.responseBody = Ke(
                                      t.responseBody,
                                      "Response"
                                  )),
                                  t
                              );
                      })(h(t))),
            q({}, He, n, {
                recordHeaders: o,
                recordBody: a,
                recordPerformance: l,
                recordInitialRequests: l,
            })
        );
    };
    function Xe(t, i, e, r, s) {
        return (
            i > e && (j.warn("min cannot be greater than max."), (i = e)),
            F(t)
                ? t > e
                    ? (r &&
                          j.warn(
                              r +
                                  " cannot be  greater than max: " +
                                  e +
                                  ". Using max value instead."
                          ),
                      e)
                    : t < i
                    ? (r &&
                          j.warn(
                              r +
                                  " cannot be less than min: " +
                                  i +
                                  ". Using min value instead."
                          ),
                      i)
                    : t
                : (r &&
                      j.warn(
                          r +
                              " must be a number. using max or fallback. max: " +
                              e +
                              ", fallback: " +
                              s
                      ),
                  Xe(s || e, i, e, r))
        );
    }
    class Qe {
        constructor(t, i) {
            var e, r;
            void 0 === i && (i = {}),
                (this.ot = 100),
                (this.lt = 10),
                (this.ut = {}),
                (this.ht = {}),
                (this.dt = () => {
                    Object.keys(this.ut).forEach((t) => {
                        (this.ut[t] = this.ut[t] + this.lt),
                            this.ut[t] >= this.ot && delete this.ut[t];
                    });
                }),
                (this.vt = (t) => {
                    var i = this._rrweb.mirror.getNode(t);
                    if (
                        "svg" !== (null == i ? void 0 : i.nodeName) &&
                        i instanceof Element
                    ) {
                        var e = i.closest("svg");
                        if (e) return [this._rrweb.mirror.getId(e), e];
                    }
                    return [t, i];
                }),
                (this.ct = (t) => {
                    var i, e, r, s, n, o, a, l;
                    return (
                        (null !==
                            (i = null == (e = t.removes) ? void 0 : e.length) &&
                        void 0 !== i
                            ? i
                            : 0) +
                        (null !==
                            (r =
                                null == (s = t.attributes)
                                    ? void 0
                                    : s.length) && void 0 !== r
                            ? r
                            : 0) +
                        (null !==
                            (n = null == (o = t.texts) ? void 0 : o.length) &&
                        void 0 !== n
                            ? n
                            : 0) +
                        (null !==
                            (a = null == (l = t.adds) ? void 0 : l.length) &&
                        void 0 !== a
                            ? a
                            : 0)
                    );
                }),
                (this.throttleMutations = (t) => {
                    if (3 !== t.type || 0 !== t.data.source) return t;
                    var i = t.data,
                        e = this.ct(i);
                    i.attributes &&
                        (i.attributes = i.attributes.filter((t) => {
                            var i,
                                e,
                                r,
                                [s, n] = this.vt(t.id);
                            if (0 === this.ut[s]) return !1;
                            ((this.ut[s] =
                                null !== (i = this.ut[s]) && void 0 !== i
                                    ? i
                                    : this.ot),
                            (this.ut[s] = Math.max(this.ut[s] - 1, 0)),
                            0 === this.ut[s]) &&
                                (this.ht[s] ||
                                    ((this.ht[s] = !0),
                                    null == (e = (r = this.ft).onBlockedNode) ||
                                        e.call(r, s, n)));
                            return t;
                        }));
                    var r = this.ct(i);
                    return 0 !== r || e === r ? t : void 0;
                }),
                (this._rrweb = t),
                (this.ft = i),
                (this.lt = Xe(
                    null !== (e = this.ft.refillRate) && void 0 !== e
                        ? e
                        : this.lt,
                    0,
                    100,
                    "mutation throttling refill rate"
                )),
                (this.ot = Xe(
                    null !== (r = this.ft.bucketSize) && void 0 !== r
                        ? r
                        : this.ot,
                    0,
                    100,
                    "mutation throttling bucket size"
                )),
                setInterval(() => {
                    this.dt();
                }, 1e3);
        }
    }
    var Ze = Uint8Array,
        tr = Uint16Array,
        ir = Uint32Array,
        er = new Ze([
            0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4,
            4, 5, 5, 5, 5, 0, 0, 0, 0,
        ]),
        rr = new Ze([
            0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9,
            10, 10, 11, 11, 12, 12, 13, 13, 0, 0,
        ]),
        sr = new Ze([
            16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
        ]),
        nr = function (t, i) {
            for (var e = new tr(31), r = 0; r < 31; ++r)
                e[r] = i += 1 << t[r - 1];
            var s = new ir(e[30]);
            for (r = 1; r < 30; ++r)
                for (var n = e[r]; n < e[r + 1]; ++n)
                    s[n] = ((n - e[r]) << 5) | r;
            return [e, s];
        },
        or = nr(er, 2),
        ar = or[0],
        lr = or[1];
    (ar[28] = 258), (lr[258] = 28);
    for (var ur = nr(rr, 0)[1], hr = new tr(32768), dr = 0; dr < 32768; ++dr) {
        var vr = ((43690 & dr) >>> 1) | ((21845 & dr) << 1);
        (vr =
            ((61680 & (vr = ((52428 & vr) >>> 2) | ((13107 & vr) << 2))) >>>
                4) |
            ((3855 & vr) << 4)),
            (hr[dr] = (((65280 & vr) >>> 8) | ((255 & vr) << 8)) >>> 1);
    }
    var cr = function (t, i, e) {
            for (var r = t.length, s = 0, n = new tr(i); s < r; ++s)
                ++n[t[s] - 1];
            var o,
                a = new tr(i);
            for (s = 0; s < i; ++s) a[s] = (a[s - 1] + n[s - 1]) << 1;
            if (e) {
                o = new tr(1 << i);
                var l = 15 - i;
                for (s = 0; s < r; ++s)
                    if (t[s])
                        for (
                            var u = (s << 4) | t[s],
                                h = i - t[s],
                                d = a[t[s] - 1]++ << h,
                                v = d | ((1 << h) - 1);
                            d <= v;
                            ++d
                        )
                            o[hr[d] >>> l] = u;
            } else
                for (o = new tr(r), s = 0; s < r; ++s)
                    o[s] = hr[a[t[s] - 1]++] >>> (15 - t[s]);
            return o;
        },
        fr = new Ze(288);
    for (dr = 0; dr < 144; ++dr) fr[dr] = 8;
    for (dr = 144; dr < 256; ++dr) fr[dr] = 9;
    for (dr = 256; dr < 280; ++dr) fr[dr] = 7;
    for (dr = 280; dr < 288; ++dr) fr[dr] = 8;
    var pr = new Ze(32);
    for (dr = 0; dr < 32; ++dr) pr[dr] = 5;
    var gr = cr(fr, 9, 0),
        _r = cr(pr, 5, 0),
        mr = function (t) {
            return ((t / 8) >> 0) + (7 & t && 1);
        },
        br = function (t, i, e) {
            (null == e || e > t.length) && (e = t.length);
            var r = new (t instanceof tr ? tr : t instanceof ir ? ir : Ze)(
                e - i
            );
            return r.set(t.subarray(i, e)), r;
        },
        wr = function (t, i, e) {
            e <<= 7 & i;
            var r = (i / 8) >> 0;
            (t[r] |= e), (t[r + 1] |= e >>> 8);
        },
        yr = function (t, i, e) {
            e <<= 7 & i;
            var r = (i / 8) >> 0;
            (t[r] |= e), (t[r + 1] |= e >>> 8), (t[r + 2] |= e >>> 16);
        },
        Sr = function (t, i) {
            for (var e = [], r = 0; r < t.length; ++r)
                t[r] && e.push({ s: r, f: t[r] });
            var s = e.length,
                n = e.slice();
            if (!s) return [new Ze(0), 0];
            if (1 == s) {
                var o = new Ze(e[0].s + 1);
                return (o[e[0].s] = 1), [o, 1];
            }
            e.sort(function (t, i) {
                return t.f - i.f;
            }),
                e.push({ s: -1, f: 25001 });
            var a = e[0],
                l = e[1],
                u = 0,
                h = 1,
                d = 2;
            for (e[0] = { s: -1, f: a.f + l.f, l: a, r: l }; h != s - 1; )
                (a = e[e[u].f < e[d].f ? u++ : d++]),
                    (l = e[u != h && e[u].f < e[d].f ? u++ : d++]),
                    (e[h++] = { s: -1, f: a.f + l.f, l: a, r: l });
            var v = n[0].s;
            for (r = 1; r < s; ++r) n[r].s > v && (v = n[r].s);
            var c = new tr(v + 1),
                f = $r(e[h - 1], c, 0);
            if (f > i) {
                r = 0;
                var p = 0,
                    g = f - i,
                    _ = 1 << g;
                for (
                    n.sort(function (t, i) {
                        return c[i.s] - c[t.s] || t.f - i.f;
                    });
                    r < s;
                    ++r
                ) {
                    var m = n[r].s;
                    if (!(c[m] > i)) break;
                    (p += _ - (1 << (f - c[m]))), (c[m] = i);
                }
                for (p >>>= g; p > 0; ) {
                    var b = n[r].s;
                    c[b] < i ? (p -= 1 << (i - c[b]++ - 1)) : ++r;
                }
                for (; r >= 0 && p; --r) {
                    var w = n[r].s;
                    c[w] == i && (--c[w], ++p);
                }
                f = i;
            }
            return [new Ze(c), f];
        },
        $r = function (t, i, e) {
            return -1 == t.s
                ? Math.max($r(t.l, i, e + 1), $r(t.r, i, e + 1))
                : (i[t.s] = e);
        },
        kr = function (t) {
            for (var i = t.length; i && !t[--i]; );
            for (
                var e = new tr(++i),
                    r = 0,
                    s = t[0],
                    n = 1,
                    o = function (t) {
                        e[r++] = t;
                    },
                    a = 1;
                a <= i;
                ++a
            )
                if (t[a] == s && a != i) ++n;
                else {
                    if (!s && n > 2) {
                        for (; n > 138; n -= 138) o(32754);
                        n > 2 &&
                            (o(
                                n > 10
                                    ? ((n - 11) << 5) | 28690
                                    : ((n - 3) << 5) | 12305
                            ),
                            (n = 0));
                    } else if (n > 3) {
                        for (o(s), --n; n > 6; n -= 6) o(8304);
                        n > 2 && (o(((n - 3) << 5) | 8208), (n = 0));
                    }
                    for (; n--; ) o(s);
                    (n = 1), (s = t[a]);
                }
            return [e.subarray(0, r), i];
        },
        xr = function (t, i) {
            for (var e = 0, r = 0; r < i.length; ++r) e += t[r] * i[r];
            return e;
        },
        Er = function (t, i, e) {
            var r = e.length,
                s = mr(i + 2);
            (t[s] = 255 & r),
                (t[s + 1] = r >>> 8),
                (t[s + 2] = 255 ^ t[s]),
                (t[s + 3] = 255 ^ t[s + 1]);
            for (var n = 0; n < r; ++n) t[s + n + 4] = e[n];
            return 8 * (s + 4 + r);
        },
        Ir = function (t, i, e, r, s, n, o, a, l, u, h) {
            wr(i, h++, e), ++s[256];
            for (
                var d = Sr(s, 15),
                    v = d[0],
                    c = d[1],
                    f = Sr(n, 15),
                    p = f[0],
                    g = f[1],
                    _ = kr(v),
                    m = _[0],
                    b = _[1],
                    w = kr(p),
                    y = w[0],
                    S = w[1],
                    $ = new tr(19),
                    k = 0;
                k < m.length;
                ++k
            )
                $[31 & m[k]]++;
            for (k = 0; k < y.length; ++k) $[31 & y[k]]++;
            for (
                var x = Sr($, 7), E = x[0], I = x[1], P = 19;
                P > 4 && !E[sr[P - 1]];
                --P
            );
            var R,
                T,
                M,
                C,
                O = (u + 5) << 3,
                F = xr(s, fr) + xr(n, pr) + o,
                A =
                    xr(s, v) +
                    xr(n, p) +
                    o +
                    14 +
                    3 * P +
                    xr($, E) +
                    (2 * $[16] + 3 * $[17] + 7 * $[18]);
            if (O <= F && O <= A) return Er(i, h, t.subarray(l, l + u));
            if ((wr(i, h, 1 + (A < F)), (h += 2), A < F)) {
                (R = cr(v, c, 0)), (T = v), (M = cr(p, g, 0)), (C = p);
                var D = cr(E, I, 0);
                wr(i, h, b - 257),
                    wr(i, h + 5, S - 1),
                    wr(i, h + 10, P - 4),
                    (h += 14);
                for (k = 0; k < P; ++k) wr(i, h + 3 * k, E[sr[k]]);
                h += 3 * P;
                for (var L = [m, y], N = 0; N < 2; ++N) {
                    var j = L[N];
                    for (k = 0; k < j.length; ++k) {
                        var z = 31 & j[k];
                        wr(i, h, D[z]),
                            (h += E[z]),
                            z > 15 &&
                                (wr(i, h, (j[k] >>> 5) & 127),
                                (h += j[k] >>> 12));
                    }
                }
            } else (R = gr), (T = fr), (M = _r), (C = pr);
            for (k = 0; k < a; ++k)
                if (r[k] > 255) {
                    z = (r[k] >>> 18) & 31;
                    yr(i, h, R[z + 257]),
                        (h += T[z + 257]),
                        z > 7 && (wr(i, h, (r[k] >>> 23) & 31), (h += er[z]));
                    var U = 31 & r[k];
                    yr(i, h, M[U]),
                        (h += C[U]),
                        U > 3 && (yr(i, h, (r[k] >>> 5) & 8191), (h += rr[U]));
                } else yr(i, h, R[r[k]]), (h += T[r[k]]);
            return yr(i, h, R[256]), h + T[256];
        },
        Pr = new ir([
            65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560,
            2117632,
        ]),
        Rr = (function () {
            for (var t = new ir(256), i = 0; i < 256; ++i) {
                for (var e = i, r = 9; --r; )
                    e = (1 & e && 3988292384) ^ (e >>> 1);
                t[i] = e;
            }
            return t;
        })(),
        Tr = function () {
            var t = 4294967295;
            return {
                p: function (i) {
                    for (var e = t, r = 0; r < i.length; ++r)
                        e = Rr[(255 & e) ^ i[r]] ^ (e >>> 8);
                    t = e;
                },
                d: function () {
                    return 4294967295 ^ t;
                },
            };
        },
        Mr = function (t, i, e, r, s) {
            return (function (t, i, e, r, s, n) {
                var o = t.length,
                    a = new Ze(r + o + 5 * (1 + Math.floor(o / 7e3)) + s),
                    l = a.subarray(r, a.length - s),
                    u = 0;
                if (!i || o < 8)
                    for (var h = 0; h <= o; h += 65535) {
                        var d = h + 65535;
                        d < o
                            ? (u = Er(l, u, t.subarray(h, d)))
                            : ((l[h] = n), (u = Er(l, u, t.subarray(h, o))));
                    }
                else {
                    for (
                        var v = Pr[i - 1],
                            c = v >>> 13,
                            f = 8191 & v,
                            p = (1 << e) - 1,
                            g = new tr(32768),
                            _ = new tr(p + 1),
                            m = Math.ceil(e / 3),
                            b = 2 * m,
                            w = function (i) {
                                return (
                                    (t[i] ^ (t[i + 1] << m) ^ (t[i + 2] << b)) &
                                    p
                                );
                            },
                            y = new ir(25e3),
                            S = new tr(288),
                            $ = new tr(32),
                            k = 0,
                            x = 0,
                            E = ((h = 0), 0),
                            I = 0,
                            P = 0;
                        h < o;
                        ++h
                    ) {
                        var R = w(h),
                            T = 32767 & h,
                            M = _[R];
                        if (((g[T] = M), (_[R] = T), I <= h)) {
                            var C = o - h;
                            if ((k > 7e3 || E > 24576) && C > 423) {
                                (u = Ir(t, l, 0, y, S, $, x, E, P, h - P, u)),
                                    (E = k = x = 0),
                                    (P = h);
                                for (var O = 0; O < 286; ++O) S[O] = 0;
                                for (O = 0; O < 30; ++O) $[O] = 0;
                            }
                            var F = 2,
                                A = 0,
                                D = f,
                                L = (T - M) & 32767;
                            if (C > 2 && R == w(h - L))
                                for (
                                    var N = Math.min(c, C) - 1,
                                        j = Math.min(32767, h),
                                        z = Math.min(258, C);
                                    L <= j && --D && T != M;

                                ) {
                                    if (t[h + F] == t[h + F - L]) {
                                        for (
                                            var U = 0;
                                            U < z && t[h + U] == t[h + U - L];
                                            ++U
                                        );
                                        if (U > F) {
                                            if (((F = U), (A = L), U > N))
                                                break;
                                            var B = Math.min(L, U - 2),
                                                q = 0;
                                            for (O = 0; O < B; ++O) {
                                                var H =
                                                        (h - L + O + 32768) &
                                                        32767,
                                                    W =
                                                        (H - g[H] + 32768) &
                                                        32767;
                                                W > q && ((q = W), (M = H));
                                            }
                                        }
                                    }
                                    L += ((T = M) - (M = g[T]) + 32768) & 32767;
                                }
                            if (A) {
                                y[E++] = 268435456 | (lr[F] << 18) | ur[A];
                                var G = 31 & lr[F],
                                    J = 31 & ur[A];
                                (x += er[G] + rr[J]),
                                    ++S[257 + G],
                                    ++$[J],
                                    (I = h + F),
                                    ++k;
                            } else (y[E++] = t[h]), ++S[t[h]];
                        }
                    }
                    u = Ir(t, l, n, y, S, $, x, E, P, h - P, u);
                }
                return br(a, 0, r + mr(u) + s);
            })(
                t,
                null == i.level ? 6 : i.level,
                null == i.mem
                    ? Math.ceil(
                          1.5 * Math.max(8, Math.min(13, Math.log(t.length)))
                      )
                    : 12 + i.mem,
                e,
                r,
                !s
            );
        },
        Cr = function (t, i, e) {
            for (; e; ++i) (t[i] = e), (e >>>= 8);
        },
        Or = function (t, i) {
            var e = i.filename;
            if (
                ((t[0] = 31),
                (t[1] = 139),
                (t[2] = 8),
                (t[8] = i.level < 2 ? 4 : 9 == i.level ? 2 : 0),
                (t[9] = 3),
                0 != i.mtime &&
                    Cr(t, 4, Math.floor(new Date(i.mtime || Date.now()) / 1e3)),
                e)
            ) {
                t[3] = 8;
                for (var r = 0; r <= e.length; ++r) t[r + 10] = e.charCodeAt(r);
            }
        },
        Fr = function (t) {
            return 10 + ((t.filename && t.filename.length + 1) || 0);
        };
    function Ar(t, i) {
        void 0 === i && (i = {});
        var e = Tr(),
            r = t.length;
        e.p(t);
        var s = Mr(t, i, Fr(i), 8),
            n = s.length;
        return Or(s, i), Cr(s, n - 8, e.d()), Cr(s, n - 4, r), s;
    }
    function Dr(t, i) {
        var e = t.length;
        if ("undefined" != typeof TextEncoder)
            return new TextEncoder().encode(t);
        for (
            var r = new Ze(t.length + (t.length >>> 1)),
                s = 0,
                n = function (t) {
                    r[s++] = t;
                },
                o = 0;
            o < e;
            ++o
        ) {
            if (s + 5 > r.length) {
                var a = new Ze(s + 8 + ((e - o) << 1));
                a.set(r), (r = a);
            }
            var l = t.charCodeAt(o);
            l < 128 || i
                ? n(l)
                : l < 2048
                ? (n(192 | (l >>> 6)), n(128 | (63 & l)))
                : l > 55295 && l < 57344
                ? (n(
                      240 |
                          ((l =
                              (65536 + (1047552 & l)) |
                              (1023 & t.charCodeAt(++o))) >>>
                              18)
                  ),
                  n(128 | ((l >>> 12) & 63)),
                  n(128 | ((l >>> 6) & 63)),
                  n(128 | (63 & l)))
                : (n(224 | (l >>> 12)),
                  n(128 | ((l >>> 6) & 63)),
                  n(128 | (63 & l)));
        }
        return br(r, 0, s);
    }
    function Lr(t, i) {
        return (
            (function (t) {
                for (var i = 0, e = 0; e < t.length; e++)
                    (i = (i << 5) - i + t.charCodeAt(e)), (i |= 0);
                return Math.abs(i);
            })(t) %
                100 <
            Xe(100 * i, 0, 100)
        );
    }
    var Nr = "disabled",
        jr = "sampled",
        zr = "active",
        Ur = "buffering",
        Br = "paused",
        qr = "trigger",
        Hr = qr + "_activated",
        Wr = qr + "_pending",
        Gr = qr + "_" + Nr;
    function Jr(t, i) {
        return i.some(
            (i) => "regex" === i.matching && new RegExp(i.url).test(t)
        );
    }
    class Vr {
        constructor(t) {
            this.gt = t;
        }
        triggerStatus(t) {
            var i = this.gt.map((i) => i.triggerStatus(t));
            return i.includes(Hr) ? Hr : i.includes(Wr) ? Wr : Gr;
        }
        stop() {
            this.gt.forEach((t) => t.stop());
        }
    }
    class Kr {
        constructor(t) {
            this.gt = t;
        }
        triggerStatus(t) {
            var i = new Set();
            for (var e of this.gt) i.add(e.triggerStatus(t));
            switch ((i.delete(Gr), i.size)) {
                case 0:
                    return Gr;
                case 1:
                    return Array.from(i)[0];
                default:
                    return Wr;
            }
        }
        stop() {
            this.gt.forEach((t) => t.stop());
        }
    }
    class Yr {
        triggerStatus() {
            return Wr;
        }
        stop() {}
    }
    class Xr {
        constructor(t) {
            (this._t = []),
                (this.bt = []),
                (this.urlBlocked = !1),
                (this._instance = t);
        }
        onRemoteConfig(t) {
            var i, e;
            (this._t =
                (null == (i = t.sessionRecording) ? void 0 : i.urlTriggers) ||
                []),
                (this.bt =
                    (null == (e = t.sessionRecording)
                        ? void 0
                        : e.urlBlocklist) || []);
        }
        wt(t) {
            var i;
            return 0 === this._t.length
                ? Gr
                : (null == (i = this._instance)
                      ? void 0
                      : i.get_property(xt)) === t
                ? Hr
                : Wr;
        }
        triggerStatus(t) {
            var i = this.wt(t),
                e = i === Hr ? Hr : i === Wr ? Wr : Gr;
            return (
                this._instance.register_for_session({
                    $sdk_debug_replay_url_trigger_status: e,
                }),
                e
            );
        }
        checkUrlTriggerConditions(i, e, r) {
            if (void 0 !== t && t.location.href) {
                var s = t.location.href,
                    n = this.urlBlocked,
                    o = Jr(s, this.bt);
                (n && o) ||
                    (o && !n ? i() : !o && n && e(),
                    Jr(s, this._t) && r("url"));
            }
        }
        stop() {}
    }
    class Qr {
        constructor(t) {
            (this.linkedFlag = null),
                (this.linkedFlagSeen = !1),
                (this.yt = () => {}),
                (this._instance = t);
        }
        triggerStatus() {
            var t = Wr;
            return (
                O(this.linkedFlag) && (t = Gr),
                this.linkedFlagSeen && (t = Hr),
                this._instance.register_for_session({
                    $sdk_debug_replay_linked_flag_trigger_status: t,
                }),
                t
            );
        }
        onRemoteConfig(t, i) {
            var e;
            if (
                ((this.linkedFlag =
                    (null == (e = t.sessionRecording)
                        ? void 0
                        : e.linkedFlag) || null),
                !O(this.linkedFlag) && !this.linkedFlagSeen)
            ) {
                var r = T(this.linkedFlag)
                        ? this.linkedFlag
                        : this.linkedFlag.flag,
                    s = T(this.linkedFlag) ? null : this.linkedFlag.variant;
                this.yt = this._instance.onFeatureFlags((t, e) => {
                    var n = !1;
                    if (I(e) && r in e) {
                        var o = e[r];
                        n = A(o) ? !0 === o : s ? o === s : !!o;
                    }
                    (this.linkedFlagSeen = n), n && i(r, s);
                });
            }
        }
        stop() {
            this.yt();
        }
    }
    class Zr {
        constructor(t) {
            (this.St = []), (this._instance = t);
        }
        onRemoteConfig(t) {
            var i;
            this.St =
                (null == (i = t.sessionRecording) ? void 0 : i.eventTriggers) ||
                [];
        }
        $t(t) {
            var i;
            return 0 === this.St.length
                ? Gr
                : (null == (i = this._instance)
                      ? void 0
                      : i.get_property(Et)) === t
                ? Hr
                : Wr;
        }
        triggerStatus(t) {
            var i = this.$t(t),
                e = i === Hr ? Hr : i === Wr ? Wr : Gr;
            return (
                this._instance.register_for_session({
                    $sdk_debug_replay_event_trigger_status: e,
                }),
                e
            );
        }
        stop() {}
    }
    function ts(t) {
        return t.isRecordingEnabled ? Ur : Nr;
    }
    function is(t) {
        if (!t.receivedDecide) return Ur;
        if (!t.isRecordingEnabled) return Nr;
        if (t.urlTriggerMatching.urlBlocked) return Br;
        var i = !0 === t.isSampled,
            e = new Vr([
                t.eventTriggerMatching,
                t.urlTriggerMatching,
                t.linkedFlagMatching,
            ]).triggerStatus(t.sessionId);
        return i
            ? jr
            : e === Hr
            ? zr
            : e === Wr
            ? Ur
            : !1 === t.isSampled
            ? Nr
            : zr;
    }
    function es(t) {
        if (!t.receivedDecide) return Ur;
        if (!t.isRecordingEnabled) return Nr;
        if (t.urlTriggerMatching.urlBlocked) return Br;
        var i = new Kr([
                t.eventTriggerMatching,
                t.urlTriggerMatching,
                t.linkedFlagMatching,
            ]).triggerStatus(t.sessionId),
            e = i !== Gr,
            r = A(t.isSampled);
        return e && i === Wr
            ? Ur
            : (e && i === Gr) || (r && !t.isSampled)
            ? Nr
            : !0 === t.isSampled
            ? jr
            : zr;
    }
    var rs = "[SessionRecording]",
        ss = z(rs);
    function ns() {
        var t;
        return null == v ||
            null == (t = v.__PosthogExtensions__) ||
            null == (t = t.rrweb)
            ? void 0
            : t.record;
    }
    var os = 3e5,
        as = [
            Ue.MouseMove,
            Ue.MouseInteraction,
            Ue.Scroll,
            Ue.ViewportResize,
            Ue.Input,
            Ue.TouchMove,
            Ue.MediaInteraction,
            Ue.Drag,
        ],
        ls = (t) => ({ rrwebMethod: t, enqueuedAt: Date.now(), attempt: 1 });
    function us(t) {
        return (function (t, i) {
            for (var e = "", r = 0; r < t.length; ) {
                var s = t[r++];
                s < 128 || i
                    ? (e += String.fromCharCode(s))
                    : s < 224
                    ? (e += String.fromCharCode(
                          ((31 & s) << 6) | (63 & t[r++])
                      ))
                    : s < 240
                    ? (e += String.fromCharCode(
                          ((15 & s) << 12) |
                              ((63 & t[r++]) << 6) |
                              (63 & t[r++])
                      ))
                    : ((s =
                          (((15 & s) << 18) |
                              ((63 & t[r++]) << 12) |
                              ((63 & t[r++]) << 6) |
                              (63 & t[r++])) -
                          65536),
                      (e += String.fromCharCode(
                          55296 | (s >> 10),
                          56320 | (1023 & s)
                      )));
            }
            return e;
        })(Ar(Dr(JSON.stringify(t))), !0);
    }
    function hs(t) {
        return t.type === ze.Custom && "sessionIdle" === t.data.tag;
    }
    class ds {
        get sessionId() {
            return this.kt;
        }
        get xt() {
            return (
                this._instance.config.session_recording
                    .session_idle_threshold_ms || 3e5
            );
        }
        get started() {
            return this.Et;
        }
        get It() {
            if (!this._instance.sessionManager)
                throw new Error(
                    rs + " must be started with a valid sessionManager."
                );
            return this._instance.sessionManager;
        }
        get Pt() {
            var t, i;
            return this.Rt.triggerStatus(this.sessionId) === Wr
                ? 6e4
                : null !==
                      (t =
                          null == (i = this._instance.config.session_recording)
                              ? void 0
                              : i.full_snapshot_interval_millis) && void 0 !== t
                ? t
                : os;
        }
        get Tt() {
            var t = this._instance.get_property(kt);
            return A(t) ? t : null;
        }
        get Mt() {
            var t,
                i,
                e =
                    null == (t = this.M)
                        ? void 0
                        : t.data[
                              (null == (i = this.M) ? void 0 : i.data.length) -
                                  1
                          ],
                { sessionStartTimestamp: r } =
                    this.It.checkAndGetSessionAndWindowId(!0);
            return e ? e.timestamp - r : null;
        }
        get Ct() {
            var i = !!this._instance.get_property(pt),
                e = !this._instance.config.disable_session_recording;
            return t && i && e;
        }
        get Ot() {
            var t = !!this._instance.get_property(gt),
                i = this._instance.config.enable_recording_console_log;
            return null != i ? i : t;
        }
        get Ft() {
            var t,
                i,
                e,
                r,
                s,
                n,
                o = this._instance.config.session_recording.captureCanvas,
                a = this._instance.get_property(bt),
                l =
                    null !==
                        (t =
                            null !==
                                (i = null == o ? void 0 : o.recordCanvas) &&
                            void 0 !== i
                                ? i
                                : null == a
                                ? void 0
                                : a.enabled) &&
                    void 0 !== t &&
                    t,
                u =
                    null !==
                        (e =
                            null !== (r = null == o ? void 0 : o.canvasFps) &&
                            void 0 !== r
                                ? r
                                : null == a
                                ? void 0
                                : a.fps) && void 0 !== e
                        ? e
                        : 4,
                h =
                    null !==
                        (s =
                            null !==
                                (n = null == o ? void 0 : o.canvasQuality) &&
                            void 0 !== n
                                ? n
                                : null == a
                                ? void 0
                                : a.quality) && void 0 !== s
                        ? s
                        : 0.4;
            if ("string" == typeof h) {
                var d = parseFloat(h);
                h = isNaN(d) ? 0.4 : d;
            }
            return {
                enabled: l,
                fps: Xe(u, 0, 12, "canvas recording fps", 4),
                quality: Xe(h, 0, 1, "canvas recording quality", 0.4),
            };
        }
        get At() {
            var t,
                i,
                e = this._instance.get_property(_t),
                r = {
                    recordHeaders:
                        null == (t = this._instance.config.session_recording)
                            ? void 0
                            : t.recordHeaders,
                    recordBody:
                        null == (i = this._instance.config.session_recording)
                            ? void 0
                            : i.recordBody,
                },
                s =
                    (null == r ? void 0 : r.recordHeaders) ||
                    (null == e ? void 0 : e.recordHeaders),
                n =
                    (null == r ? void 0 : r.recordBody) ||
                    (null == e ? void 0 : e.recordBody),
                o = I(this._instance.config.capture_performance)
                    ? this._instance.config.capture_performance.network_timing
                    : this._instance.config.capture_performance,
                a = !!(A(o) ? o : null == e ? void 0 : e.capturePerformance);
            return s || n || a
                ? { recordHeaders: s, recordBody: n, recordPerformance: a }
                : void 0;
        }
        get Dt() {
            var t,
                i,
                e,
                r,
                s,
                n,
                o = this._instance.get_property(mt),
                a = {
                    maskAllInputs:
                        null == (t = this._instance.config.session_recording)
                            ? void 0
                            : t.maskAllInputs,
                    maskTextSelector:
                        null == (i = this._instance.config.session_recording)
                            ? void 0
                            : i.maskTextSelector,
                    blockSelector:
                        null == (e = this._instance.config.session_recording)
                            ? void 0
                            : e.blockSelector,
                },
                l =
                    null !== (r = null == a ? void 0 : a.maskAllInputs) &&
                    void 0 !== r
                        ? r
                        : null == o
                        ? void 0
                        : o.maskAllInputs,
                u =
                    null !== (s = null == a ? void 0 : a.maskTextSelector) &&
                    void 0 !== s
                        ? s
                        : null == o
                        ? void 0
                        : o.maskTextSelector,
                h =
                    null !== (n = null == a ? void 0 : a.blockSelector) &&
                    void 0 !== n
                        ? n
                        : null == o
                        ? void 0
                        : o.blockSelector;
            return R(l) && R(u) && R(h)
                ? void 0
                : {
                      maskAllInputs: null == l || l,
                      maskTextSelector: u,
                      blockSelector: h,
                  };
        }
        get Lt() {
            var t = this._instance.get_property(wt);
            return F(t) ? t : null;
        }
        get Nt() {
            var t = this._instance.get_property(yt);
            return F(t) ? t : null;
        }
        get status() {
            return this.jt
                ? this.zt({
                      receivedDecide: this.jt,
                      isRecordingEnabled: this.Ct,
                      isSampled: this.Tt,
                      urlTriggerMatching: this.Ut,
                      eventTriggerMatching: this.Bt,
                      linkedFlagMatching: this.qt,
                      sessionId: this.sessionId,
                  })
                : Ur;
        }
        constructor(t) {
            if (
                ((this.zt = ts),
                (this.jt = !1),
                (this.Ht = []),
                (this.Wt = "unknown"),
                (this.Gt = Date.now()),
                (this.Rt = new Yr()),
                (this.Jt = void 0),
                (this.Vt = void 0),
                (this.Kt = void 0),
                (this.Yt = void 0),
                (this.Xt = void 0),
                (this._forceAllowLocalhostNetworkCapture = !1),
                (this.Qt = () => {
                    this.Zt();
                }),
                (this.ti = () => {
                    this.ii("browser offline", {});
                }),
                (this.ei = () => {
                    this.ii("browser online", {});
                }),
                (this.ri = () => {
                    if (null != o && o.visibilityState) {
                        var t = "window " + o.visibilityState;
                        this.ii(t, {});
                    }
                }),
                (this._instance = t),
                (this.Et = !1),
                (this.si = "/s/"),
                (this.ni = void 0),
                (this.jt = !1),
                !this._instance.sessionManager)
            )
                throw (
                    (ss.error("started without valid sessionManager"),
                    new Error(
                        rs +
                            " started without valid sessionManager. This is a bug."
                    ))
                );
            if (this._instance.config.__preview_experimental_cookieless_mode)
                throw new Error(
                    rs +
                        " cannot be used with __preview_experimental_cookieless_mode."
                );
            (this.qt = new Qr(this._instance)),
                (this.Ut = new Xr(this._instance)),
                (this.Bt = new Zr(this._instance));
            var { sessionId: i, windowId: e } =
                this.It.checkAndGetSessionAndWindowId();
            (this.kt = i),
                (this.oi = e),
                (this.M = this.ai()),
                this.xt >= this.It.sessionTimeoutMs &&
                    ss.warn(
                        "session_idle_threshold_ms (" +
                            this.xt +
                            ") is greater than the session timeout (" +
                            this.It.sessionTimeoutMs +
                            "). Session will never be detected as idle"
                    );
        }
        startIfEnabledOrStop(i) {
            this.Ct
                ? (this.li(i),
                  st(t, "beforeunload", this.Qt),
                  st(t, "offline", this.ti),
                  st(t, "online", this.ei),
                  st(t, "visibilitychange", this.ri),
                  this.ui(),
                  this.hi(),
                  O(this.Jt) &&
                      (this.Jt = this._instance.on("eventCaptured", (t) => {
                          try {
                              if ("$pageview" === t.event) {
                                  var i =
                                      null != t && t.properties.$current_url
                                          ? this.di(
                                                null == t
                                                    ? void 0
                                                    : t.properties.$current_url
                                            )
                                          : "";
                                  if (!i) return;
                                  this.ii("$pageview", { href: i });
                              }
                          } catch (t) {
                              ss.error(
                                  "Could not add $pageview to rrweb session",
                                  t
                              );
                          }
                      })),
                  this.Vt ||
                      (this.Vt = this.It.onSessionId((t, i, e) => {
                          var r, s;
                          e &&
                              (this.ii("$session_id_change", {
                                  sessionId: t,
                                  windowId: i,
                                  changeReason: e,
                              }),
                              null == (r = this._instance) ||
                                  null == (r = r.persistence) ||
                                  r.unregister(Et),
                              null == (s = this._instance) ||
                                  null == (s = s.persistence) ||
                                  s.unregister(xt));
                      })))
                : this.stopRecording();
        }
        stopRecording() {
            var i, e, r, s;
            this.Et &&
                this.ni &&
                (this.ni(),
                (this.ni = void 0),
                (this.Et = !1),
                null == t || t.removeEventListener("beforeunload", this.Qt),
                null == t || t.removeEventListener("offline", this.ti),
                null == t || t.removeEventListener("online", this.ei),
                null == t || t.removeEventListener("visibilitychange", this.ri),
                this.ai(),
                clearInterval(this.vi),
                null == (i = this.Jt) || i.call(this),
                (this.Jt = void 0),
                null == (e = this.Xt) || e.call(this),
                (this.Xt = void 0),
                null == (r = this.Vt) || r.call(this),
                (this.Vt = void 0),
                null == (s = this.Yt) || s.call(this),
                (this.Yt = void 0),
                this.Bt.stop(),
                this.Ut.stop(),
                this.qt.stop(),
                ss.info("stopped"));
        }
        ci() {
            var t;
            null == (t = this._instance.persistence) || t.unregister(kt);
        }
        fi(t) {
            var i,
                e = this.kt !== t,
                r = this.Lt;
            if (F(r)) {
                var s = this.Tt,
                    n = e || !A(s),
                    o = n ? Lr(t, r) : s;
                n &&
                    (o
                        ? this.pi(jr)
                        : ss.warn(
                              "Sample rate (" +
                                  r +
                                  ") has determined that this sessionId (" +
                                  t +
                                  ") will not be sent to the server."
                          ),
                    this.ii("samplingDecisionMade", {
                        sampleRate: r,
                        isSampled: o,
                    })),
                    null == (i = this._instance.persistence) ||
                        i.register({ [kt]: o });
            } else this.ci();
        }
        onRemoteConfig(t) {
            var i, e, r, s;
            (this.ii("$remote_config_received", t),
            this.gi(t),
            null != (i = t.sessionRecording) && i.endpoint) &&
                (this.si =
                    null == (s = t.sessionRecording) ? void 0 : s.endpoint);
            this.ui(),
                "any" ===
                (null == (e = t.sessionRecording) ? void 0 : e.triggerMatchType)
                    ? ((this.zt = is), (this.Rt = new Vr([this.Bt, this.Ut])))
                    : ((this.zt = es), (this.Rt = new Kr([this.Bt, this.Ut]))),
                this._instance.register_for_session({
                    $sdk_debug_replay_remote_trigger_matching_config:
                        null == (r = t.sessionRecording)
                            ? void 0
                            : r.triggerMatchType,
                }),
                this.Ut.onRemoteConfig(t),
                this.Bt.onRemoteConfig(t),
                this.qt.onRemoteConfig(t, (t, i) => {
                    this.pi("linked_flag_matched", { flag: t, variant: i });
                }),
                (this.jt = !0),
                this.startIfEnabledOrStop();
        }
        ui() {
            F(this.Lt) &&
                O(this.Yt) &&
                (this.Yt = this.It.onSessionId((t) => {
                    this.fi(t);
                }));
        }
        gi(t) {
            if (this._instance.persistence) {
                var i,
                    e = this._instance.persistence,
                    r = () => {
                        var i,
                            r,
                            s,
                            n,
                            o,
                            a,
                            l,
                            u,
                            h,
                            d =
                                null == (i = t.sessionRecording)
                                    ? void 0
                                    : i.sampleRate,
                            v = O(d) ? null : parseFloat(d);
                        O(v) && this.ci();
                        var c =
                            null == (r = t.sessionRecording)
                                ? void 0
                                : r.minimumDurationMilliseconds;
                        e.register({
                            [pt]: !!t.sessionRecording,
                            [gt]:
                                null == (s = t.sessionRecording)
                                    ? void 0
                                    : s.consoleLogRecordingEnabled,
                            [_t]: q(
                                { capturePerformance: t.capturePerformance },
                                null == (n = t.sessionRecording)
                                    ? void 0
                                    : n.networkPayloadCapture
                            ),
                            [mt]:
                                null == (o = t.sessionRecording)
                                    ? void 0
                                    : o.masking,
                            [bt]: {
                                enabled:
                                    null == (a = t.sessionRecording)
                                        ? void 0
                                        : a.recordCanvas,
                                fps:
                                    null == (l = t.sessionRecording)
                                        ? void 0
                                        : l.canvasFps,
                                quality:
                                    null == (u = t.sessionRecording)
                                        ? void 0
                                        : u.canvasQuality,
                            },
                            [wt]: v,
                            [yt]: R(c) ? null : c,
                            [St]:
                                null == (h = t.sessionRecording)
                                    ? void 0
                                    : h.scriptConfig,
                        });
                    };
                r(),
                    null == (i = this.Kt) || i.call(this),
                    (this.Kt = this.It.onSessionId(r));
            }
        }
        log(t, i) {
            var e;
            void 0 === i && (i = "log"),
                null == (e = this._instance.sessionRecording) ||
                    e.onRRwebEmit({
                        type: 6,
                        data: {
                            plugin: "rrweb/console@1",
                            payload: {
                                level: i,
                                trace: [],
                                payload: [JSON.stringify(t)],
                            },
                        },
                        timestamp: Date.now(),
                    });
        }
        li(t) {
            if (
                !R(Object.assign) &&
                !R(Array.from) &&
                !(
                    this.Et ||
                    this._instance.config.disable_session_recording ||
                    this._instance.consent.isOptedOut()
                )
            ) {
                var i;
                if (
                    ((this.Et = !0),
                    this.It.checkAndGetSessionAndWindowId(),
                    ns())
                )
                    this.mi();
                else
                    null == (i = v.__PosthogExtensions__) ||
                        null == i.loadExternalDependency ||
                        i.loadExternalDependency(
                            this._instance,
                            this.bi,
                            (t) => {
                                if (t)
                                    return ss.error(
                                        "could not load recorder",
                                        t
                                    );
                                this.mi();
                            }
                        );
                ss.info("starting"),
                    this.status === zr && this.pi(t || "recording_initialized");
            }
        }
        get bi() {
            var t;
            return (
                (null == (t = this._instance) ||
                null == (t = t.persistence) ||
                null == (t = t.get_property(St))
                    ? void 0
                    : t.script) || "recorder"
            );
        }
        wi(t) {
            var i;
            return (
                3 === t.type &&
                -1 !== as.indexOf(null == (i = t.data) ? void 0 : i.source)
            );
        }
        yi(t) {
            var i = this.wi(t);
            i ||
                this.Wt ||
                (t.timestamp - this.Gt > this.xt &&
                    ((this.Wt = !0),
                    clearInterval(this.vi),
                    this.ii("sessionIdle", {
                        eventTimestamp: t.timestamp,
                        lastActivityTimestamp: this.Gt,
                        threshold: this.xt,
                        bufferLength: this.M.data.length,
                        bufferSize: this.M.size,
                    }),
                    this.Zt()));
            var e = !1;
            if (i && ((this.Gt = t.timestamp), this.Wt)) {
                var r = "unknown" === this.Wt;
                (this.Wt = !1),
                    r ||
                        (this.ii("sessionNoLongerIdle", {
                            reason: "user activity",
                            type: t.type,
                        }),
                        (e = !0));
            }
            if (!this.Wt) {
                var { windowId: s, sessionId: n } =
                        this.It.checkAndGetSessionAndWindowId(!i, t.timestamp),
                    o = this.kt !== n,
                    a = this.oi !== s;
                (this.oi = s),
                    (this.kt = n),
                    o || a
                        ? (this.stopRecording(),
                          this.startIfEnabledOrStop("session_id_changed"))
                        : e && this.Si();
            }
        }
        $i(t) {
            try {
                return t.rrwebMethod(), !0;
            } catch (i) {
                return (
                    this.Ht.length < 10
                        ? this.Ht.push({
                              enqueuedAt: t.enqueuedAt || Date.now(),
                              attempt: t.attempt++,
                              rrwebMethod: t.rrwebMethod,
                          })
                        : ss.warn("could not emit queued rrweb event.", i, t),
                    !1
                );
            }
        }
        ii(t, i) {
            return this.$i(ls(() => ns().addCustomEvent(t, i)));
        }
        ki() {
            return this.$i(ls(() => ns().takeFullSnapshot()));
        }
        mi() {
            var t,
                i,
                e,
                r,
                s = {
                    blockClass: "ph-no-capture",
                    blockSelector: void 0,
                    ignoreClass: "ph-ignore-input",
                    maskTextClass: "ph-mask",
                    maskTextSelector: void 0,
                    maskTextFn: void 0,
                    maskAllInputs: !0,
                    maskInputOptions: { password: !0 },
                    maskInputFn: void 0,
                    slimDOMOptions: {},
                    collectFonts: !1,
                    inlineStylesheet: !0,
                    recordCrossOriginIframes: !1,
                },
                n = this._instance.config.session_recording;
            for (var [o, a] of Object.entries(n || {}))
                o in s &&
                    ("maskInputOptions" === o
                        ? (s.maskInputOptions = q({ password: !0 }, a))
                        : (s[o] = a));
            (this.Ft &&
                this.Ft.enabled &&
                ((s.recordCanvas = !0),
                (s.sampling = { canvas: this.Ft.fps }),
                (s.dataURLOptions = {
                    type: "image/webp",
                    quality: this.Ft.quality,
                })),
            this.Dt) &&
                ((s.maskAllInputs =
                    null === (i = this.Dt.maskAllInputs) || void 0 === i || i),
                (s.maskTextSelector =
                    null !== (e = this.Dt.maskTextSelector) && void 0 !== e
                        ? e
                        : void 0),
                (s.blockSelector =
                    null !== (r = this.Dt.blockSelector) && void 0 !== r
                        ? r
                        : void 0));
            var l = ns();
            if (l) {
                this.xi =
                    null !== (t = this.xi) && void 0 !== t
                        ? t
                        : new Qe(l, {
                              refillRate:
                                  this._instance.config.session_recording
                                      .__mutationRateLimiterRefillRate,
                              bucketSize:
                                  this._instance.config.session_recording
                                      .__mutationRateLimiterBucketSize,
                              onBlockedNode: (t, i) => {
                                  var e =
                                      "Too many mutations on node '" +
                                      t +
                                      "'. Rate limiting. This could be due to SVG animations or something similar";
                                  ss.info(e, { node: i }),
                                      this.log(rs + " " + e, "warn");
                              },
                          });
                var u = this.Ei();
                (this.ni = l(
                    q(
                        {
                            emit: (t) => {
                                this.onRRwebEmit(t);
                            },
                            plugins: u,
                        },
                        s
                    )
                )),
                    (this.Gt = Date.now()),
                    (this.Wt = A(this.Wt) ? this.Wt : "unknown"),
                    this.ii("$session_options", {
                        sessionRecordingOptions: s,
                        activePlugins: u.map((t) =>
                            null == t ? void 0 : t.name
                        ),
                    }),
                    this.ii("$posthog_config", {
                        config: this._instance.config,
                    });
            } else
                ss.error(
                    "onScriptLoaded was called but rrwebRecord is not available. This indicates something has gone wrong."
                );
        }
        Si() {
            if ((this.vi && clearInterval(this.vi), !0 !== this.Wt)) {
                var t = this.Pt;
                t &&
                    (this.vi = setInterval(() => {
                        this.ki();
                    }, t));
            }
        }
        Ei() {
            var t,
                i,
                e = [],
                r =
                    null == (t = v.__PosthogExtensions__) ||
                    null == (t = t.rrwebPlugins)
                        ? void 0
                        : t.getRecordConsolePlugin;
            r && this.Ot && e.push(r());
            var s =
                null == (i = v.__PosthogExtensions__) ||
                null == (i = i.rrwebPlugins)
                    ? void 0
                    : i.getRecordNetworkPlugin;
            this.At &&
                E(s) &&
                (!wi.includes(location.hostname) ||
                this._forceAllowLocalhostNetworkCapture
                    ? e.push(s(Ye(this._instance.config, this.At)))
                    : ss.info(
                          "NetworkCapture not started because we are on localhost."
                      ));
            return e;
        }
        onRRwebEmit(t) {
            var i;
            if ((this.Ii(), t && I(t))) {
                if (t.type === ze.Meta) {
                    var e = this.di(t.data.href);
                    if (((this.Pi = e), !e)) return;
                    t.data.href = e;
                } else this.Ri();
                if (
                    (this.Ut.checkUrlTriggerConditions(
                        () => this.Ti(),
                        () => this.Mi(),
                        (t) => this.Ci(t)
                    ),
                    !this.Ut.urlBlocked ||
                        ((r = t).type === ze.Custom &&
                            "recording paused" === r.data.tag))
                ) {
                    var r;
                    t.type === ze.FullSnapshot && this.Si(),
                        t.type === ze.FullSnapshot &&
                            this.jt &&
                            this.Rt.triggerStatus(this.sessionId) === Wr &&
                            this.ai();
                    var s = this.xi ? this.xi.throttleMutations(t) : t;
                    if (s) {
                        var n = (function (t) {
                            var i = t;
                            if (
                                i &&
                                I(i) &&
                                6 === i.type &&
                                I(i.data) &&
                                "rrweb/console@1" === i.data.plugin
                            ) {
                                i.data.payload.payload.length > 10 &&
                                    ((i.data.payload.payload =
                                        i.data.payload.payload.slice(0, 10)),
                                    i.data.payload.payload.push(
                                        "...[truncated]"
                                    ));
                                for (
                                    var e = [], r = 0;
                                    r < i.data.payload.payload.length;
                                    r++
                                )
                                    i.data.payload.payload[r] &&
                                    i.data.payload.payload[r].length > 2e3
                                        ? e.push(
                                              i.data.payload.payload[r].slice(
                                                  0,
                                                  2e3
                                              ) + "...[truncated]"
                                          )
                                        : e.push(i.data.payload.payload[r]);
                                return (i.data.payload.payload = e), t;
                            }
                            return t;
                        })(s);
                        if ((this.yi(n), !0 !== this.Wt || hs(n))) {
                            if (hs(n)) {
                                var o = n.data.payload;
                                if (o) {
                                    var a = o.lastActivityTimestamp,
                                        l = o.threshold;
                                    n.timestamp = a + l;
                                }
                            }
                            var u =
                                    null ===
                                        (i =
                                            this._instance.config
                                                .session_recording
                                                .compress_events) ||
                                    void 0 === i ||
                                    i
                                        ? (function (t) {
                                              if (Ne(t) < 1024) return t;
                                              try {
                                                  if (
                                                      t.type === ze.FullSnapshot
                                                  )
                                                      return q({}, t, {
                                                          data: us(t.data),
                                                          cv: "2024-10",
                                                      });
                                                  if (
                                                      t.type ===
                                                          ze.IncrementalSnapshot &&
                                                      t.data.source ===
                                                          Ue.Mutation
                                                  )
                                                      return q({}, t, {
                                                          cv: "2024-10",
                                                          data: q({}, t.data, {
                                                              texts: us(
                                                                  t.data.texts
                                                              ),
                                                              attributes: us(
                                                                  t.data
                                                                      .attributes
                                                              ),
                                                              removes: us(
                                                                  t.data.removes
                                                              ),
                                                              adds: us(
                                                                  t.data.adds
                                                              ),
                                                          }),
                                                      });
                                                  if (
                                                      t.type ===
                                                          ze.IncrementalSnapshot &&
                                                      t.data.source ===
                                                          Ue.StyleSheetRule
                                                  )
                                                      return q({}, t, {
                                                          cv: "2024-10",
                                                          data: q({}, t.data, {
                                                              adds: t.data.adds
                                                                  ? us(
                                                                        t.data
                                                                            .adds
                                                                    )
                                                                  : void 0,
                                                              removes: t.data
                                                                  .removes
                                                                  ? us(
                                                                        t.data
                                                                            .removes
                                                                    )
                                                                  : void 0,
                                                          }),
                                                      });
                                              } catch (t) {
                                                  ss.error(
                                                      "could not compress event - will use uncompressed event",
                                                      t
                                                  );
                                              }
                                              return t;
                                          })(n)
                                        : n,
                                h = {
                                    $snapshot_bytes: Ne(u),
                                    $snapshot_data: u,
                                    $session_id: this.kt,
                                    $window_id: this.oi,
                                };
                            this.status !== Nr ? this.Oi(h) : this.ai();
                        }
                    }
                }
            }
        }
        Ri() {
            if (!this._instance.config.capture_pageview && t) {
                var i = this.di(t.location.href);
                this.Pi !== i &&
                    (this.ii("$url_changed", { href: i }), (this.Pi = i));
            }
        }
        Ii() {
            if (this.Ht.length) {
                var t = [...this.Ht];
                (this.Ht = []),
                    t.forEach((t) => {
                        Date.now() - t.enqueuedAt <= 2e3 && this.$i(t);
                    });
            }
        }
        di(t) {
            var i = this._instance.config.session_recording;
            if (i.maskNetworkRequestFn) {
                var e,
                    r = { url: t };
                return null == (e = r = i.maskNetworkRequestFn(r))
                    ? void 0
                    : e.url;
            }
            return t;
        }
        ai() {
            return (
                (this.M = {
                    size: 0,
                    data: [],
                    sessionId: this.kt,
                    windowId: this.oi,
                }),
                this.M
            );
        }
        Zt() {
            this.Fi && (clearTimeout(this.Fi), (this.Fi = void 0));
            var t = this.Nt,
                i = this.Mt,
                e = F(i) && i >= 0,
                r = F(t) && e && i < t;
            if (
                this.status === Ur ||
                this.status === Br ||
                this.status === Nr ||
                r
            )
                return (
                    (this.Fi = setTimeout(() => {
                        this.Zt();
                    }, 2e3)),
                    this.M
                );
            this.M.data.length > 0 &&
                je(this.M).forEach((t) => {
                    this.Ai({
                        $snapshot_bytes: t.size,
                        $snapshot_data: t.data,
                        $session_id: t.sessionId,
                        $window_id: t.windowId,
                        $lib: "web",
                        $lib_version: c.LIB_VERSION,
                    });
                });
            return this.ai();
        }
        Oi(t) {
            var i,
                e = 2 + ((null == (i = this.M) ? void 0 : i.data.length) || 0);
            !this.Wt &&
                (this.M.size + t.$snapshot_bytes + e > 943718.4 ||
                    this.M.sessionId !== this.kt) &&
                (this.M = this.Zt()),
                (this.M.size += t.$snapshot_bytes),
                this.M.data.push(t.$snapshot_data),
                this.Fi ||
                    this.Wt ||
                    (this.Fi = setTimeout(() => {
                        this.Zt();
                    }, 2e3));
        }
        Ai(t) {
            this._instance.capture("$snapshot", t, {
                _url: this._instance.requestRouter.endpointFor("api", this.si),
                _noTruncate: !0,
                _batchKey: "recordings",
                skip_client_rate_limiting: !0,
            });
        }
        Ci(t) {
            var i;
            this.Rt.triggerStatus(this.sessionId) === Wr &&
                (null == (i = this._instance) ||
                    null == (i = i.persistence) ||
                    i.register({ ["url" === t ? xt : Et]: this.kt }),
                this.Zt(),
                this.pi(t + "_trigger_matched"));
        }
        Ti() {
            this.Ut.urlBlocked ||
                ((this.Ut.urlBlocked = !0),
                clearInterval(this.vi),
                ss.info("recording paused due to URL blocker"),
                this.ii("recording paused", { reason: "url blocker" }));
        }
        Mi() {
            this.Ut.urlBlocked &&
                ((this.Ut.urlBlocked = !1),
                this.ki(),
                this.Si(),
                this.ii("recording resumed", { reason: "left blocked url" }),
                ss.info("recording resumed"));
        }
        hi() {
            0 !== this.Bt.St.length &&
                O(this.Xt) &&
                (this.Xt = this._instance.on("eventCaptured", (t) => {
                    try {
                        this.Bt.St.includes(t.event) && this.Ci("event");
                    } catch (t) {
                        ss.error("Could not activate event trigger", t);
                    }
                }));
        }
        overrideLinkedFlag() {
            (this.qt.linkedFlagSeen = !0),
                this.ki(),
                this.pi("linked_flag_overridden");
        }
        overrideSampling() {
            var t;
            null == (t = this._instance.persistence) ||
                t.register({ [kt]: !0 }),
                this.ki(),
                this.pi("sampling_overridden");
        }
        overrideTrigger(t) {
            this.Ci(t);
        }
        pi(t, i) {
            this._instance.register_for_session({
                $session_recording_start_reason: t,
            }),
                ss.info(t.replace("_", " "), i),
                m(["recording_initialized", "session_id_changed"], t) ||
                    this.ii(t, i);
        }
        get sdkDebugProperties() {
            var { sessionStartTimestamp: t } =
                this.It.checkAndGetSessionAndWindowId(!0);
            return {
                $recording_status: this.status,
                $sdk_debug_replay_internal_buffer_length: this.M.data.length,
                $sdk_debug_replay_internal_buffer_size: this.M.size,
                $sdk_debug_current_session_duration: this.Mt,
                $sdk_debug_session_start: t,
            };
        }
    }
    var vs = z("[SegmentIntegration]");
    function cs(t, i) {
        var e = t.config.segment;
        if (!e) return i();
        !(function (t, i) {
            var e = t.config.segment;
            if (!e) return i();
            var r = (e) => {
                    var r = () => e.anonymousId() || Ni();
                    (t.config.get_device_id = r),
                        e.id() &&
                            (t.register({
                                distinct_id: e.id(),
                                $device_id: r(),
                            }),
                            t.persistence.set_property(At, "identified")),
                        i();
                },
                s = e.user();
            "then" in s && E(s.then) ? s.then((t) => r(t)) : r(s);
        })(t, () => {
            e.register(
                ((t) => {
                    (Promise && Promise.resolve) ||
                        vs.warn(
                            "This browser does not have Promise support, and can not use the segment integration"
                        );
                    var i = (i, e) => {
                        if (!e) return i;
                        i.event.userId ||
                            i.event.anonymousId === t.get_distinct_id() ||
                            (vs.info("No userId set, resetting PostHog"),
                            t.reset()),
                            i.event.userId &&
                                i.event.userId !== t.get_distinct_id() &&
                                (vs.info(
                                    "UserId set, identifying with PostHog"
                                ),
                                t.identify(i.event.userId));
                        var r = t.calculateEventProperties(
                            e,
                            i.event.properties
                        );
                        return (
                            (i.event.properties = Object.assign(
                                {},
                                r,
                                i.event.properties
                            )),
                            i
                        );
                    };
                    return {
                        name: "PostHog JS",
                        type: "enrichment",
                        version: "1.0.0",
                        isLoaded: () => !0,
                        load: () => Promise.resolve(),
                        track: (t) => i(t, t.event.event),
                        page: (t) => i(t, "$pageview"),
                        identify: (t) => i(t, "$identify"),
                        screen: (t) => i(t, "$screen"),
                    };
                })(t)
            ).then(() => {
                i();
            });
        });
    }
    var fs = "posthog-js";
    function ps(t, i) {
        var {
            organization: e,
            projectId: r,
            prefix: s,
            severityAllowList: n = ["error"],
        } = void 0 === i ? {} : i;
        return (i) => {
            var o, a, l, u, h;
            if (!("*" === n || n.includes(i.level)) || !t.__loaded) return i;
            i.tags || (i.tags = {});
            var d = t.requestRouter.endpointFor(
                "ui",
                "/project/" + t.config.token + "/person/" + t.get_distinct_id()
            );
            (i.tags["PostHog Person URL"] = d),
                t.sessionRecordingStarted() &&
                    (i.tags["PostHog Recording URL"] = t.get_session_replay_url(
                        { withTimestamp: !0 }
                    ));
            var v = (null == (o = i.exception) ? void 0 : o.values) || [],
                c = v.map((t) =>
                    q({}, t, {
                        stacktrace: t.stacktrace
                            ? q({}, t.stacktrace, {
                                  type: "raw",
                                  frames: (t.stacktrace.frames || []).map((t) =>
                                      q({}, t, { platform: "web:javascript" })
                                  ),
                              })
                            : void 0,
                    })
                ),
                f = {
                    $exception_message:
                        (null == (a = v[0]) ? void 0 : a.value) || i.message,
                    $exception_type: null == (l = v[0]) ? void 0 : l.type,
                    $exception_personURL: d,
                    $exception_level: i.level,
                    $exception_list: c,
                    $sentry_event_id: i.event_id,
                    $sentry_exception: i.exception,
                    $sentry_exception_message:
                        (null == (u = v[0]) ? void 0 : u.value) || i.message,
                    $sentry_exception_type:
                        null == (h = v[0]) ? void 0 : h.type,
                    $sentry_tags: i.tags,
                };
            return (
                e &&
                    r &&
                    (f.$sentry_url =
                        (s || "https://sentry.io/organizations/") +
                        e +
                        "/issues/?project=" +
                        r +
                        "&query=" +
                        i.event_id),
                t.exceptions.sendExceptionEvent(f),
                i
            );
        };
    }
    class gs {
        constructor(t, i, e, r, s) {
            (this.name = fs),
                (this.setupOnce = function (n) {
                    n(
                        ps(t, {
                            organization: i,
                            projectId: e,
                            prefix: r,
                            severityAllowList: s,
                        })
                    );
                });
        }
    }
    var _s =
            null != t && t.location
                ? xi(t.location.hash, "__posthog") || xi(location.hash, "state")
                : null,
        ms = "_postHogToolbarParams",
        bs = z("[Toolbar]"),
        ws = (function (t) {
            return (
                (t[(t.UNINITIALIZED = 0)] = "UNINITIALIZED"),
                (t[(t.LOADING = 1)] = "LOADING"),
                (t[(t.LOADED = 2)] = "LOADED"),
                t
            );
        })(ws || {});
    class ys {
        constructor(t) {
            this.instance = t;
        }
        Di(t) {
            v.ph_toolbar_state = t;
        }
        Li() {
            var t;
            return null !== (t = v.ph_toolbar_state) && void 0 !== t
                ? t
                : ws.UNINITIALIZED;
        }
        maybeLoadToolbar(i, e, r) {
            if (
                (void 0 === i && (i = void 0),
                void 0 === e && (e = void 0),
                void 0 === r && (r = void 0),
                !t || !o)
            )
                return !1;
            (i = null != i ? i : t.location), (r = null != r ? r : t.history);
            try {
                if (!e) {
                    try {
                        t.localStorage.setItem("test", "test"),
                            t.localStorage.removeItem("test");
                    } catch (t) {
                        return !1;
                    }
                    e = null == t ? void 0 : t.localStorage;
                }
                var s,
                    n = _s || xi(i.hash, "__posthog") || xi(i.hash, "state"),
                    a = n
                        ? X(() => JSON.parse(atob(decodeURIComponent(n)))) ||
                          X(() => JSON.parse(decodeURIComponent(n)))
                        : null;
                return (
                    a && "ph_authorize" === a.action
                        ? (((s = a).source = "url"),
                          s &&
                              Object.keys(s).length > 0 &&
                              (a.desiredHash
                                  ? (i.hash = a.desiredHash)
                                  : r
                                  ? r.replaceState(
                                        r.state,
                                        "",
                                        i.pathname + i.search
                                    )
                                  : (i.hash = "")))
                        : (((s = JSON.parse(e.getItem(ms) || "{}")).source =
                              "localstorage"),
                          delete s.userIntent),
                    !(!s.token || this.instance.config.token !== s.token) &&
                        (this.loadToolbar(s), !0)
                );
            } catch (t) {
                return !1;
            }
        }
        Ni(t) {
            var i = v.ph_load_toolbar || v.ph_load_editor;
            !O(i) && E(i)
                ? i(t, this.instance)
                : bs.warn("No toolbar load function found");
        }
        loadToolbar(i) {
            var e = !(null == o || !o.getElementById(Bt));
            if (!t || e) return !1;
            var r =
                    "custom" === this.instance.requestRouter.region &&
                    this.instance.config.advanced_disable_toolbar_metrics,
                s = q(
                    { token: this.instance.config.token },
                    i,
                    { apiURL: this.instance.requestRouter.endpointFor("ui") },
                    r ? { instrument: !1 } : {}
                );
            if (
                (t.localStorage.setItem(
                    ms,
                    JSON.stringify(q({}, s, { source: void 0 }))
                ),
                this.Li() === ws.LOADED)
            )
                this.Ni(s);
            else if (this.Li() === ws.UNINITIALIZED) {
                var n;
                this.Di(ws.LOADING),
                    null == (n = v.__PosthogExtensions__) ||
                        null == n.loadExternalDependency ||
                        n.loadExternalDependency(
                            this.instance,
                            "toolbar",
                            (t) => {
                                if (t)
                                    return (
                                        bs.error("[Toolbar] Failed to load", t),
                                        void this.Di(ws.UNINITIALIZED)
                                    );
                                this.Di(ws.LOADED), this.Ni(s);
                            }
                        ),
                    st(t, "turbolinks:load", () => {
                        this.Di(ws.UNINITIALIZED), this.loadToolbar(s);
                    });
            }
            return !0;
        }
        ji(t) {
            return this.loadToolbar(t);
        }
        maybeLoadEditor(t, i, e) {
            return (
                void 0 === t && (t = void 0),
                void 0 === i && (i = void 0),
                void 0 === e && (e = void 0),
                this.maybeLoadToolbar(t, i, e)
            );
        }
    }
    var Ss = z("[TracingHeaders]");
    class $s {
        constructor(t) {
            (this.zi = void 0),
                (this.Ui = void 0),
                (this.V = () => {
                    var t, i;
                    R(this.zi) &&
                        (null == (t = v.__PosthogExtensions__) ||
                            null == (t = t.tracingHeadersPatchFns) ||
                            t._patchXHR(this._instance.sessionManager));
                    R(this.Ui) &&
                        (null == (i = v.__PosthogExtensions__) ||
                            null == (i = i.tracingHeadersPatchFns) ||
                            i._patchFetch(this._instance.sessionManager));
                }),
                (this._instance = t);
        }
        G(t) {
            var i, e;
            null != (i = v.__PosthogExtensions__) &&
                i.tracingHeadersPatchFns &&
                t(),
                null == (e = v.__PosthogExtensions__) ||
                    null == e.loadExternalDependency ||
                    e.loadExternalDependency(
                        this._instance,
                        "tracing-headers",
                        (i) => {
                            if (i) return Ss.error("failed to load script", i);
                            t();
                        }
                    );
        }
        startIfEnabledOrStop() {
            var t, i;
            this._instance.config.__add_tracing_headers
                ? this.G(this.V)
                : (null == (t = this.zi) || t.call(this),
                  null == (i = this.Ui) || i.call(this),
                  (this.zi = void 0),
                  (this.Ui = void 0));
        }
    }
    var ks = z("[Web Vitals]"),
        xs = 9e5;
    class Es {
        constructor(t) {
            var i;
            (this.Bi = !1),
                (this.i = !1),
                (this.M = {
                    url: void 0,
                    metrics: [],
                    firstMetricTimestamp: void 0,
                }),
                (this.qi = () => {
                    clearTimeout(this.Hi),
                        0 !== this.M.metrics.length &&
                            (this._instance.capture(
                                "$web_vitals",
                                this.M.metrics.reduce(
                                    (t, i) =>
                                        q({}, t, {
                                            ["$web_vitals_" +
                                            i.name +
                                            "_event"]: q({}, i),
                                            ["$web_vitals_" +
                                            i.name +
                                            "_value"]: i.value,
                                        }),
                                    {}
                                )
                            ),
                            (this.M = {
                                url: void 0,
                                metrics: [],
                                firstMetricTimestamp: void 0,
                            }));
                }),
                (this.Wi = (t) => {
                    var i,
                        e =
                            null == (i = this._instance.sessionManager)
                                ? void 0
                                : i.checkAndGetSessionAndWindowId(!0);
                    if (R(e))
                        ks.error(
                            "Could not read session ID. Dropping metrics!"
                        );
                    else {
                        this.M = this.M || {
                            url: void 0,
                            metrics: [],
                            firstMetricTimestamp: void 0,
                        };
                        var r = this.Gi();
                        if (!R(r))
                            if (
                                O(null == t ? void 0 : t.name) ||
                                O(null == t ? void 0 : t.value)
                            )
                                ks.error("Invalid metric received", t);
                            else if (this.Ji && t.value >= this.Ji)
                                ks.error(
                                    "Ignoring metric with value >= " + this.Ji,
                                    t
                                );
                            else
                                this.M.url !== r &&
                                    (this.qi(),
                                    (this.Hi = setTimeout(
                                        this.qi,
                                        this.flushToCaptureTimeoutMs
                                    ))),
                                    R(this.M.url) && (this.M.url = r),
                                    (this.M.firstMetricTimestamp = R(
                                        this.M.firstMetricTimestamp
                                    )
                                        ? Date.now()
                                        : this.M.firstMetricTimestamp),
                                    t.attribution &&
                                        t.attribution
                                            .interactionTargetElement &&
                                        (t.attribution.interactionTargetElement =
                                            void 0),
                                    this.M.metrics.push(
                                        q({}, t, {
                                            $current_url: r,
                                            $session_id: e.sessionId,
                                            $window_id: e.windowId,
                                            timestamp: Date.now(),
                                        })
                                    ),
                                    this.M.metrics.length ===
                                        this.allowedMetrics.length && this.qi();
                    }
                }),
                (this.V = () => {
                    var t,
                        i,
                        e,
                        r,
                        s = v.__PosthogExtensions__;
                    R(s) ||
                        R(s.postHogWebVitalsCallbacks) ||
                        ({
                            onLCP: t,
                            onCLS: i,
                            onFCP: e,
                            onINP: r,
                        } = s.postHogWebVitalsCallbacks),
                        t && i && e && r
                            ? (this.allowedMetrics.indexOf("LCP") > -1 &&
                                  t(this.Wi.bind(this)),
                              this.allowedMetrics.indexOf("CLS") > -1 &&
                                  i(this.Wi.bind(this)),
                              this.allowedMetrics.indexOf("FCP") > -1 &&
                                  e(this.Wi.bind(this)),
                              this.allowedMetrics.indexOf("INP") > -1 &&
                                  r(this.Wi.bind(this)),
                              (this.i = !0))
                            : ks.error(
                                  "web vitals callbacks not loaded - not starting"
                              );
                }),
                (this._instance = t),
                (this.Bi = !(
                    null == (i = this._instance.persistence) || !i.props[vt]
                )),
                this.startIfEnabled();
        }
        get allowedMetrics() {
            var t,
                i,
                e = I(this._instance.config.capture_performance)
                    ? null == (t = this._instance.config.capture_performance)
                        ? void 0
                        : t.web_vitals_allowed_metrics
                    : void 0;
            return R(e)
                ? (null == (i = this._instance.persistence)
                      ? void 0
                      : i.props[ft]) || ["CLS", "FCP", "INP", "LCP"]
                : e;
        }
        get flushToCaptureTimeoutMs() {
            return (
                (I(this._instance.config.capture_performance)
                    ? this._instance.config.capture_performance
                          .web_vitals_delayed_flush_ms
                    : void 0) || 5e3
            );
        }
        get Ji() {
            var t =
                I(this._instance.config.capture_performance) &&
                F(
                    this._instance.config.capture_performance
                        .__web_vitals_max_value
                )
                    ? this._instance.config.capture_performance
                          .__web_vitals_max_value
                    : xs;
            return 0 < t && t <= 6e4 ? xs : t;
        }
        get isEnabled() {
            var t = null == a ? void 0 : a.protocol;
            if ("http:" !== t && "https:" !== t)
                return (
                    ks.info(
                        "Web Vitals are disabled on non-http/https protocols"
                    ),
                    !1
                );
            var i = I(this._instance.config.capture_performance)
                ? this._instance.config.capture_performance.web_vitals
                : A(this._instance.config.capture_performance)
                ? this._instance.config.capture_performance
                : void 0;
            return A(i) ? i : this.Bi;
        }
        startIfEnabled() {
            this.isEnabled &&
                !this.i &&
                (ks.info("enabled, starting..."), this.G(this.V));
        }
        onRemoteConfig(t) {
            var i =
                    I(t.capturePerformance) &&
                    !!t.capturePerformance.web_vitals,
                e = I(t.capturePerformance)
                    ? t.capturePerformance.web_vitals_allowed_metrics
                    : void 0;
            this._instance.persistence &&
                (this._instance.persistence.register({ [vt]: i }),
                this._instance.persistence.register({ [ft]: e })),
                (this.Bi = i),
                this.startIfEnabled();
        }
        G(t) {
            var i, e;
            null != (i = v.__PosthogExtensions__) &&
                i.postHogWebVitalsCallbacks &&
                t(),
                null == (e = v.__PosthogExtensions__) ||
                    null == e.loadExternalDependency ||
                    e.loadExternalDependency(
                        this._instance,
                        "web-vitals",
                        (i) => {
                            i ? ks.error("failed to load script", i) : t();
                        }
                    );
        }
        Gi() {
            var i = t ? t.location.href : void 0;
            return i || ks.error("Could not determine current URL"), i;
        }
    }
    var Is = z("[Heatmaps]");
    function Ps(t) {
        return (
            I(t) &&
            "clientX" in t &&
            "clientY" in t &&
            F(t.clientX) &&
            F(t.clientY)
        );
    }
    class Rs {
        constructor(t) {
            var i;
            (this.rageclicks = new bi()),
                (this.Bi = !1),
                (this.i = !1),
                (this.Vi = null),
                (this.instance = t),
                (this.Bi = !(
                    null == (i = this.instance.persistence) || !i.props[ut]
                ));
        }
        get flushIntervalMilliseconds() {
            var t = 5e3;
            return (
                I(this.instance.config.capture_heatmaps) &&
                    this.instance.config.capture_heatmaps
                        .flush_interval_milliseconds &&
                    (t =
                        this.instance.config.capture_heatmaps
                            .flush_interval_milliseconds),
                t
            );
        }
        get isEnabled() {
            return R(this.instance.config.capture_heatmaps)
                ? R(this.instance.config.enable_heatmaps)
                    ? this.Bi
                    : this.instance.config.enable_heatmaps
                : !1 !== this.instance.config.capture_heatmaps;
        }
        startIfEnabled() {
            if (this.isEnabled) {
                if (this.i) return;
                Is.info("starting..."),
                    this.Ki(),
                    (this.Vi = setInterval(
                        this.Yi.bind(this),
                        this.flushIntervalMilliseconds
                    ));
            } else {
                var t, i;
                clearInterval(
                    null !== (t = this.Vi) && void 0 !== t ? t : void 0
                ),
                    null == (i = this.Xi) || i.stop(),
                    this.getAndClearBuffer();
            }
        }
        onRemoteConfig(t) {
            var i = !!t.heatmaps;
            this.instance.persistence &&
                this.instance.persistence.register({ [ut]: i }),
                (this.Bi = i),
                this.startIfEnabled();
        }
        getAndClearBuffer() {
            var t = this.M;
            return (this.M = void 0), t;
        }
        Qi(t) {
            this.Zi(t.originalEvent, "deadclick");
        }
        Ki() {
            t &&
                o &&
                (st(t, "beforeunload", this.Yi.bind(this)),
                st(
                    o,
                    "click",
                    (i) => this.Zi(i || (null == t ? void 0 : t.event)),
                    { capture: !0 }
                ),
                st(
                    o,
                    "mousemove",
                    (i) => this.te(i || (null == t ? void 0 : t.event)),
                    { capture: !0 }
                ),
                (this.Xi = new re(this.instance, ie, this.Qi.bind(this))),
                this.Xi.startIfEnabled(),
                (this.i = !0));
        }
        ie(i, e) {
            var r = this.instance.scrollManager.scrollY(),
                s = this.instance.scrollManager.scrollX(),
                n = this.instance.scrollManager.scrollElement(),
                o = (function (i, e, r) {
                    for (var s = i; s && Gt(s) && !Jt(s, "body"); ) {
                        if (s === r) return !1;
                        if (
                            m(
                                e,
                                null == t
                                    ? void 0
                                    : t.getComputedStyle(s).position
                            )
                        )
                            return !0;
                        s = ri(s);
                    }
                    return !1;
                })(ii(i), ["fixed", "sticky"], n);
            return {
                x: i.clientX + (o ? 0 : s),
                y: i.clientY + (o ? 0 : r),
                target_fixed: o,
                type: e,
            };
        }
        Zi(t, i) {
            var e;
            if ((void 0 === i && (i = "click"), !Wt(t.target) && Ps(t))) {
                var r = this.ie(t, i);
                null != (e = this.rageclicks) &&
                    e.isRageClick(t.clientX, t.clientY, new Date().getTime()) &&
                    this.ee(q({}, r, { type: "rageclick" })),
                    this.ee(r);
            }
        }
        te(t) {
            !Wt(t.target) &&
                Ps(t) &&
                (clearTimeout(this.re),
                (this.re = setTimeout(() => {
                    this.ee(this.ie(t, "mousemove"));
                }, 500)));
        }
        ee(i) {
            if (t) {
                var e = t.location.href;
                (this.M = this.M || {}),
                    this.M[e] || (this.M[e] = []),
                    this.M[e].push(i);
            }
        }
        Yi() {
            this.M &&
                !P(this.M) &&
                this.instance.capture("$$heatmap", {
                    $heatmap_data: this.getAndClearBuffer(),
                });
        }
    }
    class Ts {
        constructor(t) {
            this._instance = t;
        }
        doPageView(i, e) {
            var r,
                s = this.se(i, e);
            return (
                (this.ne = {
                    pathname:
                        null !==
                            (r = null == t ? void 0 : t.location.pathname) &&
                        void 0 !== r
                            ? r
                            : "",
                    pageViewId: e,
                    timestamp: i,
                }),
                this._instance.scrollManager.resetContext(),
                s
            );
        }
        doPageLeave(t) {
            var i;
            return this.se(t, null == (i = this.ne) ? void 0 : i.pageViewId);
        }
        doEvent() {
            var t;
            return {
                $pageview_id: null == (t = this.ne) ? void 0 : t.pageViewId,
            };
        }
        se(t, i) {
            var e = this.ne;
            if (!e) return { $pageview_id: i };
            var r = { $pageview_id: i, $prev_pageview_id: e.pageViewId },
                s = this._instance.scrollManager.getContext();
            if (s && !this._instance.config.disable_scroll_properties) {
                var {
                    maxScrollHeight: n,
                    lastScrollY: o,
                    maxScrollY: a,
                    maxContentHeight: l,
                    lastContentY: u,
                    maxContentY: h,
                } = s;
                if (!(R(n) || R(o) || R(a) || R(l) || R(u) || R(h))) {
                    (n = Math.ceil(n)),
                        (o = Math.ceil(o)),
                        (a = Math.ceil(a)),
                        (l = Math.ceil(l)),
                        (u = Math.ceil(u)),
                        (h = Math.ceil(h));
                    var d = n <= 1 ? 1 : Xe(o / n, 0, 1),
                        v = n <= 1 ? 1 : Xe(a / n, 0, 1),
                        c = l <= 1 ? 1 : Xe(u / l, 0, 1),
                        f = l <= 1 ? 1 : Xe(h / l, 0, 1);
                    r = V(r, {
                        $prev_pageview_last_scroll: o,
                        $prev_pageview_last_scroll_percentage: d,
                        $prev_pageview_max_scroll: a,
                        $prev_pageview_max_scroll_percentage: v,
                        $prev_pageview_last_content: u,
                        $prev_pageview_last_content_percentage: c,
                        $prev_pageview_max_content: h,
                        $prev_pageview_max_content_percentage: f,
                    });
                }
            }
            return (
                e.pathname && (r.$prev_pageview_pathname = e.pathname),
                e.timestamp &&
                    (r.$prev_pageview_duration =
                        (t.getTime() - e.timestamp.getTime()) / 1e3),
                r
            );
        }
    }
    var Ms = function (t) {
            var i,
                e,
                r,
                s,
                n = "";
            for (
                i = e = 0,
                    r = (t = (t + "")
                        .replace(/\r\n/g, "\n")
                        .replace(/\r/g, "\n")).length,
                    s = 0;
                s < r;
                s++
            ) {
                var o = t.charCodeAt(s),
                    a = null;
                o < 128
                    ? e++
                    : (a =
                          o > 127 && o < 2048
                              ? String.fromCharCode(
                                    (o >> 6) | 192,
                                    (63 & o) | 128
                                )
                              : String.fromCharCode(
                                    (o >> 12) | 224,
                                    ((o >> 6) & 63) | 128,
                                    (63 & o) | 128
                                )),
                    C(a) ||
                        (e > i && (n += t.substring(i, e)),
                        (n += a),
                        (i = e = s + 1));
            }
            return e > i && (n += t.substring(i, t.length)), n;
        },
        Cs = !!u || !!l,
        Os = "text/plain",
        Fs = (t, i) => {
            var [e, r] = t.split("?"),
                s = q({}, i);
            null == r ||
                r.split("&").forEach((t) => {
                    var [i] = t.split("=");
                    delete s[i];
                });
            var n = Si(s);
            return e + "?" + (n = n ? (r ? r + "&" : "") + n : r);
        },
        As = (t, i) =>
            JSON.stringify(
                t,
                (t, i) => ("bigint" == typeof i ? i.toString() : i),
                i
            ),
        Ds = (t) => {
            var { data: i, compression: e } = t;
            if (i) {
                if (e === g.GZipJS) {
                    var r = Ar(Dr(As(i)), { mtime: 0 }),
                        s = new Blob([r], { type: Os });
                    return { contentType: Os, body: s, estimatedSize: s.size };
                }
                if (e === g.Base64) {
                    var n = (function (t) {
                            var i,
                                e,
                                r,
                                s,
                                n,
                                o =
                                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                                a = 0,
                                l = 0,
                                u = "",
                                h = [];
                            if (!t) return t;
                            t = Ms(t);
                            do {
                                (i =
                                    ((n =
                                        (t.charCodeAt(a++) << 16) |
                                        (t.charCodeAt(a++) << 8) |
                                        t.charCodeAt(a++)) >>
                                        18) &
                                    63),
                                    (e = (n >> 12) & 63),
                                    (r = (n >> 6) & 63),
                                    (s = 63 & n),
                                    (h[l++] =
                                        o.charAt(i) +
                                        o.charAt(e) +
                                        o.charAt(r) +
                                        o.charAt(s));
                            } while (a < t.length);
                            switch (((u = h.join("")), t.length % 3)) {
                                case 1:
                                    u = u.slice(0, -2) + "==";
                                    break;
                                case 2:
                                    u = u.slice(0, -1) + "=";
                            }
                            return u;
                        })(As(i)),
                        o = ((t) =>
                            "data=" +
                            encodeURIComponent(
                                "string" == typeof t ? t : As(t)
                            ))(n);
                    return {
                        contentType: "application/x-www-form-urlencoded",
                        body: o,
                        estimatedSize: new Blob([o]).size,
                    };
                }
                var a = As(i);
                return {
                    contentType: "application/json",
                    body: a,
                    estimatedSize: new Blob([a]).size,
                };
            }
        },
        Ls = [];
    l &&
        Ls.push({
            transport: "fetch",
            method: (t) => {
                var i,
                    e,
                    {
                        contentType: r,
                        body: s,
                        estimatedSize: n,
                    } = null !== (i = Ds(t)) && void 0 !== i ? i : {},
                    o = new Headers();
                J(t.headers, function (t, i) {
                    o.append(i, t);
                }),
                    r && o.append("Content-Type", r);
                var a = t.url,
                    u = null;
                if (h) {
                    var d = new h();
                    u = {
                        signal: d.signal,
                        timeout: setTimeout(() => d.abort(), t.timeout),
                    };
                }
                l(
                    a,
                    q(
                        {
                            method: (null == t ? void 0 : t.method) || "GET",
                            headers: o,
                            keepalive:
                                "POST" === t.method && (n || 0) < 52428.8,
                            body: s,
                            signal: null == (e = u) ? void 0 : e.signal,
                        },
                        t.fetchOptions
                    )
                )
                    .then((i) =>
                        i.text().then((e) => {
                            var r = { statusCode: i.status, text: e };
                            if (200 === i.status)
                                try {
                                    r.json = JSON.parse(e);
                                } catch (t) {
                                    j.error(t);
                                }
                            null == t.callback || t.callback(r);
                        })
                    )
                    .catch((i) => {
                        j.error(i),
                            null == t.callback ||
                                t.callback({ statusCode: 0, text: i });
                    })
                    .finally(() => (u ? clearTimeout(u.timeout) : null));
            },
        }),
        u &&
            Ls.push({
                transport: "XHR",
                method: (t) => {
                    var i,
                        e = new u();
                    e.open(t.method || "GET", t.url, !0);
                    var { contentType: r, body: s } =
                        null !== (i = Ds(t)) && void 0 !== i ? i : {};
                    J(t.headers, function (t, i) {
                        e.setRequestHeader(i, t);
                    }),
                        r && e.setRequestHeader("Content-Type", r),
                        t.timeout && (e.timeout = t.timeout),
                        (e.withCredentials = !0),
                        (e.onreadystatechange = () => {
                            if (4 === e.readyState) {
                                var i = {
                                    statusCode: e.status,
                                    text: e.responseText,
                                };
                                if (200 === e.status)
                                    try {
                                        i.json = JSON.parse(e.responseText);
                                    } catch (t) {}
                                null == t.callback || t.callback(i);
                            }
                        }),
                        e.send(s);
                },
            }),
        null != n &&
            n.sendBeacon &&
            Ls.push({
                transport: "sendBeacon",
                method: (t) => {
                    var i = Fs(t.url, { beacon: "1" });
                    try {
                        var e,
                            { contentType: r, body: s } =
                                null !== (e = Ds(t)) && void 0 !== e ? e : {},
                            o =
                                "string" == typeof s
                                    ? new Blob([s], { type: r })
                                    : s;
                        n.sendBeacon(i, o);
                    } catch (t) {}
                },
            });
    var Ns = function (t, i) {
        if (
            !(function (t) {
                try {
                    new RegExp(t);
                } catch (t) {
                    return !1;
                }
                return !0;
            })(i)
        )
            return !1;
        try {
            return new RegExp(i).test(t);
        } catch (t) {
            return !1;
        }
    };
    function js(t, i, e) {
        return As({
            distinct_id: t,
            userPropertiesToSet: i,
            userPropertiesToSetOnce: e,
        });
    }
    var zs = {
            exact: (t, i) => i.some((i) => t.some((t) => i === t)),
            is_not: (t, i) => i.every((i) => t.every((t) => i !== t)),
            regex: (t, i) => i.some((i) => t.some((t) => Ns(i, t))),
            not_regex: (t, i) => i.every((i) => t.every((t) => !Ns(i, t))),
            icontains: (t, i) =>
                i.map(Us).some((i) => t.map(Us).some((t) => i.includes(t))),
            not_icontains: (t, i) =>
                i.map(Us).every((i) => t.map(Us).every((t) => !i.includes(t))),
        },
        Us = (t) => t.toLowerCase(),
        Bs = z("[Error tracking]");
    class qs {
        constructor(t) {
            var i, e;
            (this.oe = []),
                (this._instance = t),
                (this.oe =
                    null !==
                        (i =
                            null == (e = this._instance.persistence)
                                ? void 0
                                : e.get_property(dt)) && void 0 !== i
                        ? i
                        : []);
        }
        onRemoteConfig(t) {
            var i,
                e,
                r =
                    null !==
                        (i =
                            null == (e = t.errorTracking)
                                ? void 0
                                : e.suppressionRules) && void 0 !== i
                        ? i
                        : [];
            (this.oe = r),
                this._instance.persistence &&
                    this._instance.persistence.register({ [dt]: this.oe });
        }
        sendExceptionEvent(t) {
            this.ae(t)
                ? Bs.info(
                      "Skipping exception capture because a suppression rule matched"
                  )
                : this._instance.capture("$exception", t, {
                      _noTruncate: !0,
                      _batchKey: "exceptionEvent",
                  });
        }
        ae(t) {
            var i = t.$exception_list;
            if (!i || !x(i) || 0 === i.length) return !1;
            var e = i.reduce(
                (t, i) => {
                    var { type: e, value: r } = i;
                    return (
                        T(e) && e.length > 0 && t.$exception_types.push(e),
                        T(r) && r.length > 0 && t.$exception_messages.push(r),
                        t
                    );
                },
                { $exception_types: [], $exception_messages: [] }
            );
            return this.oe.some((t) => {
                var i = t.values.map((t) => {
                    var i = zs[t.operator],
                        r = x(t.value) ? t.value : [t.value],
                        s = e[t.key];
                    return r.length > 0 && i(r, s);
                });
                return "OR" === t.type ? i.some(Boolean) : i.every(Boolean);
            });
        }
    }
    var Hs = "Mobile",
        Ws = "iOS",
        Gs = "Android",
        Js = "Tablet",
        Vs = Gs + " " + Js,
        Ks = "iPad",
        Ys = "Apple",
        Xs = Ys + " Watch",
        Qs = "Safari",
        Zs = "BlackBerry",
        tn = "Samsung",
        en = tn + "Browser",
        rn = tn + " Internet",
        sn = "Chrome",
        nn = sn + " OS",
        on = sn + " " + Ws,
        an = "Internet Explorer",
        ln = an + " " + Hs,
        un = "Opera",
        hn = un + " Mini",
        dn = "Edge",
        vn = "Microsoft " + dn,
        cn = "Firefox",
        fn = cn + " " + Ws,
        pn = "Nintendo",
        gn = "PlayStation",
        _n = "Xbox",
        mn = Gs + " " + Hs,
        bn = Hs + " " + Qs,
        wn = "Windows",
        yn = wn + " Phone",
        Sn = "Nokia",
        $n = "Ouya",
        kn = "Generic",
        xn = kn + " " + Hs.toLowerCase(),
        En = kn + " " + Js.toLowerCase(),
        In = "Konqueror",
        Pn = "(\\d+(\\.\\d+)?)",
        Rn = new RegExp("Version/" + Pn),
        Tn = new RegExp(_n, "i"),
        Mn = new RegExp(gn + " \\w+", "i"),
        Cn = new RegExp(pn + " \\w+", "i"),
        On = new RegExp(Zs + "|PlayBook|BB10", "i"),
        Fn = {
            "NT3.51": "NT 3.11",
            "NT4.0": "NT 4.0",
            "5.0": "2000",
            5.1: "XP",
            5.2: "XP",
            "6.0": "Vista",
            6.1: "7",
            6.2: "8",
            6.3: "8.1",
            6.4: "10",
            "10.0": "10",
        };
    var An = (t, i) =>
            (i && m(i, Ys)) ||
            (function (t) {
                return m(t, Qs) && !m(t, sn) && !m(t, Gs);
            })(t),
        Dn = function (t, i) {
            return (
                (i = i || ""),
                m(t, " OPR/") && m(t, "Mini")
                    ? hn
                    : m(t, " OPR/")
                    ? un
                    : On.test(t)
                    ? Zs
                    : m(t, "IE" + Hs) || m(t, "WPDesktop")
                    ? ln
                    : m(t, en)
                    ? rn
                    : m(t, dn) || m(t, "Edg/")
                    ? vn
                    : m(t, "FBIOS")
                    ? "Facebook " + Hs
                    : m(t, "UCWEB") || m(t, "UCBrowser")
                    ? "UC Browser"
                    : m(t, "CriOS")
                    ? on
                    : m(t, "CrMo") || m(t, sn)
                    ? sn
                    : m(t, Gs) && m(t, Qs)
                    ? mn
                    : m(t, "FxiOS")
                    ? fn
                    : m(t.toLowerCase(), In.toLowerCase())
                    ? In
                    : An(t, i)
                    ? m(t, Hs)
                        ? bn
                        : Qs
                    : m(t, cn)
                    ? cn
                    : m(t, "MSIE") || m(t, "Trident/")
                    ? an
                    : m(t, "Gecko")
                    ? cn
                    : ""
            );
        },
        Ln = {
            [ln]: [new RegExp("rv:" + Pn)],
            [vn]: [new RegExp(dn + "?\\/" + Pn)],
            [sn]: [new RegExp("(" + sn + "|CrMo)\\/" + Pn)],
            [on]: [new RegExp("CriOS\\/" + Pn)],
            "UC Browser": [new RegExp("(UCBrowser|UCWEB)\\/" + Pn)],
            [Qs]: [Rn],
            [bn]: [Rn],
            [un]: [new RegExp("(Opera|OPR)\\/" + Pn)],
            [cn]: [new RegExp(cn + "\\/" + Pn)],
            [fn]: [new RegExp("FxiOS\\/" + Pn)],
            [In]: [new RegExp("Konqueror[:/]?" + Pn, "i")],
            [Zs]: [new RegExp(Zs + " " + Pn), Rn],
            [mn]: [new RegExp("android\\s" + Pn, "i")],
            [rn]: [new RegExp(en + "\\/" + Pn)],
            [an]: [new RegExp("(rv:|MSIE )" + Pn)],
            Mozilla: [new RegExp("rv:" + Pn)],
        },
        Nn = function (t, i) {
            var e = Dn(t, i),
                r = Ln[e];
            if (R(r)) return null;
            for (var s = 0; s < r.length; s++) {
                var n = r[s],
                    o = t.match(n);
                if (o) return parseFloat(o[o.length - 2]);
            }
            return null;
        },
        jn = [
            [
                new RegExp(_n + "; " + _n + " (.*?)[);]", "i"),
                (t) => [_n, (t && t[1]) || ""],
            ],
            [new RegExp(pn, "i"), [pn, ""]],
            [new RegExp(gn, "i"), [gn, ""]],
            [On, [Zs, ""]],
            [
                new RegExp(wn, "i"),
                (t, i) => {
                    if (/Phone/.test(i) || /WPDesktop/.test(i)) return [yn, ""];
                    if (new RegExp(Hs).test(i) && !/IEMobile\b/.test(i))
                        return [wn + " " + Hs, ""];
                    var e = /Windows NT ([0-9.]+)/i.exec(i);
                    if (e && e[1]) {
                        var r = e[1],
                            s = Fn[r] || "";
                        return /arm/i.test(i) && (s = "RT"), [wn, s];
                    }
                    return [wn, ""];
                },
            ],
            [
                /((iPhone|iPad|iPod).*?OS (\d+)_(\d+)_?(\d+)?|iPhone)/,
                (t) => {
                    if (t && t[3]) {
                        var i = [t[3], t[4], t[5] || "0"];
                        return [Ws, i.join(".")];
                    }
                    return [Ws, ""];
                },
            ],
            [
                /(watch.*\/(\d+\.\d+\.\d+)|watch os,(\d+\.\d+),)/i,
                (t) => {
                    var i = "";
                    return (
                        t && t.length >= 3 && (i = R(t[2]) ? t[3] : t[2]),
                        ["watchOS", i]
                    );
                },
            ],
            [
                new RegExp(
                    "(" + Gs + " (\\d+)\\.(\\d+)\\.?(\\d+)?|" + Gs + ")",
                    "i"
                ),
                (t) => {
                    if (t && t[2]) {
                        var i = [t[2], t[3], t[4] || "0"];
                        return [Gs, i.join(".")];
                    }
                    return [Gs, ""];
                },
            ],
            [
                /Mac OS X (\d+)[_.](\d+)[_.]?(\d+)?/i,
                (t) => {
                    var i = ["Mac OS X", ""];
                    if (t && t[1]) {
                        var e = [t[1], t[2], t[3] || "0"];
                        i[1] = e.join(".");
                    }
                    return i;
                },
            ],
            [/Mac/i, ["Mac OS X", ""]],
            [/CrOS/, [nn, ""]],
            [/Linux|debian/i, ["Linux", ""]],
        ],
        zn = function (t) {
            return Cn.test(t)
                ? pn
                : Mn.test(t)
                ? gn
                : Tn.test(t)
                ? _n
                : new RegExp($n, "i").test(t)
                ? $n
                : new RegExp("(" + yn + "|WPDesktop)", "i").test(t)
                ? yn
                : /iPad/.test(t)
                ? Ks
                : /iPod/.test(t)
                ? "iPod Touch"
                : /iPhone/.test(t)
                ? "iPhone"
                : /(watch)(?: ?os[,/]|\d,\d\/)[\d.]+/i.test(t)
                ? Xs
                : On.test(t)
                ? Zs
                : /(kobo)\s(ereader|touch)/i.test(t)
                ? "Kobo"
                : new RegExp(Sn, "i").test(t)
                ? Sn
                : /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i.test(t) ||
                  /(kf[a-z]+)( bui|\)).+silk\//i.test(t)
                ? "Kindle Fire"
                : /(Android|ZTE)/i.test(t)
                ? !new RegExp(Hs).test(t) ||
                  /(9138B|TB782B|Nexus [97]|pixel c|HUAWEISHT|BTV|noble nook|smart ultra 6)/i.test(
                      t
                  )
                    ? (/pixel[\daxl ]{1,6}/i.test(t) && !/pixel c/i.test(t)) ||
                      /(huaweimed-al00|tah-|APA|SM-G92|i980|zte|U304AA)/i.test(
                          t
                      ) ||
                      (/lmy47v/i.test(t) && !/QTAQZ3/i.test(t))
                        ? Gs
                        : Vs
                    : Gs
                : new RegExp("(pda|" + Hs + ")", "i").test(t)
                ? xn
                : new RegExp(Js, "i").test(t) &&
                  !new RegExp(Js + " pc", "i").test(t)
                ? En
                : "";
        },
        Un = "https?://(.*)",
        Bn = [
            "gclid",
            "gclsrc",
            "dclid",
            "gbraid",
            "wbraid",
            "fbclid",
            "msclkid",
            "twclid",
            "li_fat_id",
            "igshid",
            "ttclid",
            "rdt_cid",
            "epik",
            "qclid",
            "sccid",
            "irclid",
            "_kx",
        ],
        qn = K(
            [
                "utm_source",
                "utm_medium",
                "utm_campaign",
                "utm_content",
                "utm_term",
                "gad_source",
                "mc_cid",
            ],
            Bn
        ),
        Hn = "<masked>";
    function Wn(t, i, e) {
        if (!o) return {};
        var r = i ? K([], Bn, e || []) : [];
        return Gn(ki(o.URL, r, Hn), t);
    }
    function Gn(t, i) {
        var e = qn.concat(i || []),
            r = {};
        return (
            J(e, function (i) {
                var e = $i(t, i);
                r[i] = e || null;
            }),
            r
        );
    }
    function Jn(t) {
        var i = (function (t) {
                return t
                    ? 0 === t.search(Un + "google.([^/?]*)")
                        ? "google"
                        : 0 === t.search(Un + "bing.com")
                        ? "bing"
                        : 0 === t.search(Un + "yahoo.com")
                        ? "yahoo"
                        : 0 === t.search(Un + "duckduckgo.com")
                        ? "duckduckgo"
                        : null
                    : null;
            })(t),
            e = "yahoo" != i ? "q" : "p",
            r = {};
        if (!C(i)) {
            r.$search_engine = i;
            var s = o ? $i(o.referrer, e) : "";
            s.length && (r.ph_keyword = s);
        }
        return r;
    }
    function Vn() {
        return navigator.language || navigator.userLanguage;
    }
    function Kn() {
        return (null == o ? void 0 : o.referrer) || "$direct";
    }
    function Yn(t, i) {
        var e = t ? K([], Bn, i || []) : [],
            r = null == a ? void 0 : a.href.substring(0, 1e3);
        return { r: Kn().substring(0, 1e3), u: r ? ki(r, e, Hn) : void 0 };
    }
    function Xn(t) {
        var i,
            { r: e, u: r } = t,
            s = {
                $referrer: e,
                $referring_domain:
                    null == e
                        ? void 0
                        : "$direct" == e
                        ? "$direct"
                        : null == (i = yi(e))
                        ? void 0
                        : i.host,
            };
        if (r) {
            s.$current_url = r;
            var n = yi(r);
            (s.$host = null == n ? void 0 : n.host),
                (s.$pathname = null == n ? void 0 : n.pathname);
            var o = Gn(r);
            V(s, o);
        }
        if (e) {
            var a = Jn(e);
            V(s, a);
        }
        return s;
    }
    function Qn() {
        try {
            return Intl.DateTimeFormat().resolvedOptions().timeZone;
        } catch (t) {
            return;
        }
    }
    function Zn() {
        try {
            return new Date().getTimezoneOffset();
        } catch (t) {
            return;
        }
    }
    function to(i, e) {
        if (!d) return {};
        var r,
            s,
            n,
            o = i ? K([], Bn, e || []) : [],
            [l, u] = (function (t) {
                for (var i = 0; i < jn.length; i++) {
                    var [e, r] = jn[i],
                        s = e.exec(t),
                        n = s && (E(r) ? r(s, t) : r);
                    if (n) return n;
                }
                return ["", ""];
            })(d);
        return V(
            Z({
                $os: l,
                $os_version: u,
                $browser: Dn(d, navigator.vendor),
                $device: zn(d),
                $device_type:
                    ((s = d),
                    (n = zn(s)),
                    n === Ks ||
                    n === Vs ||
                    "Kobo" === n ||
                    "Kindle Fire" === n ||
                    n === En
                        ? Js
                        : n === pn || n === _n || n === gn || n === $n
                        ? "Console"
                        : n === Xs
                        ? "Wearable"
                        : n
                        ? Hs
                        : "Desktop"),
                $timezone: Qn(),
                $timezone_offset: Zn(),
            }),
            {
                $current_url: ki(null == a ? void 0 : a.href, o, Hn),
                $host: null == a ? void 0 : a.host,
                $pathname: null == a ? void 0 : a.pathname,
                $raw_user_agent:
                    d.length > 1e3 ? d.substring(0, 997) + "..." : d,
                $browser_version: Nn(d, navigator.vendor),
                $browser_language: Vn(),
                $browser_language_prefix:
                    ((r = Vn()),
                    "string" == typeof r ? r.split("-")[0] : void 0),
                $screen_height: null == t ? void 0 : t.screen.height,
                $screen_width: null == t ? void 0 : t.screen.width,
                $viewport_height: null == t ? void 0 : t.innerHeight,
                $viewport_width: null == t ? void 0 : t.innerWidth,
                $lib: "web",
                $lib_version: c.LIB_VERSION,
                $insert_id:
                    Math.random().toString(36).substring(2, 10) +
                    Math.random().toString(36).substring(2, 10),
                $time: Date.now() / 1e3,
            }
        );
    }
    var io = z("[FeatureFlags]"),
        eo = "$active_feature_flags",
        ro = "$override_feature_flags",
        so = "$feature_flag_payloads",
        no = "$override_feature_flag_payloads",
        oo = "$feature_flag_request_id",
        ao = (t) => {
            var i = {};
            for (var [e, r] of Y(t || {})) r && (i[e] = r);
            return i;
        },
        lo = (t) => {
            var i = t.flags;
            return (
                i
                    ? ((t.featureFlags = Object.fromEntries(
                          Object.keys(i).map((t) => {
                              var e;
                              return [
                                  t,
                                  null !== (e = i[t].variant) && void 0 !== e
                                      ? e
                                      : i[t].enabled,
                              ];
                          })
                      )),
                      (t.featureFlagPayloads = Object.fromEntries(
                          Object.keys(i)
                              .filter((t) => i[t].enabled)
                              .filter((t) => {
                                  var e;
                                  return null == (e = i[t].metadata)
                                      ? void 0
                                      : e.payload;
                              })
                              .map((t) => {
                                  var e;
                                  return [
                                      t,
                                      null == (e = i[t].metadata)
                                          ? void 0
                                          : e.payload,
                                  ];
                              })
                      )))
                    : io.warn(
                          "Using an older version of the feature flags endpoint. Please upgrade your PostHog server to the latest version"
                      ),
                t
            );
        },
        uo = (function (t) {
            return (
                (t.FeatureFlags = "feature_flags"),
                (t.Recordings = "recordings"),
                t
            );
        })({});
    class ho {
        constructor(t) {
            (this.le = !1),
                (this.ue = !1),
                (this.he = !1),
                (this.de = !1),
                (this.ve = !1),
                (this.ce = !1),
                (this.fe = !1),
                (this._instance = t),
                (this.featureFlagEventHandlers = []);
        }
        decide() {
            if (this._instance.config.__preview_remote_config) this.ce = !0;
            else {
                var t =
                    !this.pe &&
                    (this._instance.config.advanced_disable_feature_flags ||
                        this._instance.config
                            .advanced_disable_feature_flags_on_first_load);
                this.ge({ disableFlags: t });
            }
        }
        get hasLoadedFlags() {
            return this.ue;
        }
        getFlags() {
            return Object.keys(this.getFlagVariants());
        }
        getFlagsWithDetails() {
            var t = this._instance.get_property(Rt),
                i = this._instance.get_property(ro),
                e = this._instance.get_property(no);
            if (!e && !i) return t || {};
            var r = V({}, t || {}),
                s = [
                    ...new Set([
                        ...Object.keys(e || {}),
                        ...Object.keys(i || {}),
                    ]),
                ];
            for (var n of s) {
                var o,
                    a,
                    l = r[n],
                    u = null == i ? void 0 : i[n],
                    h = R(u)
                        ? null !== (o = null == l ? void 0 : l.enabled) &&
                          void 0 !== o &&
                          o
                        : !!u,
                    d = R(u) ? l.variant : "string" == typeof u ? u : void 0,
                    v = null == e ? void 0 : e[n],
                    c = q({}, l, {
                        enabled: h,
                        variant: h
                            ? null != d
                                ? d
                                : null == l
                                ? void 0
                                : l.variant
                            : void 0,
                    });
                if (
                    (h !== (null == l ? void 0 : l.enabled) &&
                        (c.original_enabled = null == l ? void 0 : l.enabled),
                    d !== (null == l ? void 0 : l.variant) &&
                        (c.original_variant = null == l ? void 0 : l.variant),
                    v)
                )
                    c.metadata = q({}, null == l ? void 0 : l.metadata, {
                        payload: v,
                        original_payload:
                            null == l || null == (a = l.metadata)
                                ? void 0
                                : a.payload,
                    });
                r[n] = c;
            }
            return (
                this.le ||
                    (io.warn(" Overriding feature flag details!", {
                        flagDetails: t,
                        overriddenPayloads: e,
                        finalDetails: r,
                    }),
                    (this.le = !0)),
                r
            );
        }
        getFlagVariants() {
            var t = this._instance.get_property(It),
                i = this._instance.get_property(ro);
            if (!i) return t || {};
            for (var e = V({}, t), r = Object.keys(i), s = 0; s < r.length; s++)
                e[r[s]] = i[r[s]];
            return (
                this.le ||
                    (io.warn(" Overriding feature flags!", {
                        enabledFlags: t,
                        overriddenFlags: i,
                        finalFlags: e,
                    }),
                    (this.le = !0)),
                e
            );
        }
        getFlagPayloads() {
            var t = this._instance.get_property(so),
                i = this._instance.get_property(no);
            if (!i) return t || {};
            for (
                var e = V({}, t || {}), r = Object.keys(i), s = 0;
                s < r.length;
                s++
            )
                e[r[s]] = i[r[s]];
            return (
                this.le ||
                    (io.warn(" Overriding feature flag payloads!", {
                        flagPayloads: t,
                        overriddenPayloads: i,
                        finalPayloads: e,
                    }),
                    (this.le = !0)),
                e
            );
        }
        reloadFeatureFlags() {
            this.de ||
                this._instance.config.advanced_disable_feature_flags ||
                this.pe ||
                (this.pe = setTimeout(() => {
                    this.ge();
                }, 5));
        }
        _e() {
            clearTimeout(this.pe), (this.pe = void 0);
        }
        ensureFlagsLoaded() {
            this.ue || this.he || this.pe || this.reloadFeatureFlags();
        }
        setAnonymousDistinctId(t) {
            this.$anon_distinct_id = t;
        }
        setReloadingPaused(t) {
            this.de = t;
        }
        ge(t) {
            var i;
            if ((this._e(), !this._instance.config.advanced_disable_decide))
                if (this.he) this.ve = !0;
                else {
                    var e = {
                        token: this._instance.config.token,
                        distinct_id: this._instance.get_distinct_id(),
                        groups: this._instance.getGroups(),
                        $anon_distinct_id: this.$anon_distinct_id,
                        person_properties: q(
                            {},
                            (null == (i = this._instance.persistence)
                                ? void 0
                                : i.get_initial_props()) || {},
                            this._instance.get_property(Tt) || {}
                        ),
                        group_properties: this._instance.get_property(Mt),
                    };
                    ((null != t && t.disableFlags) ||
                        this._instance.config.advanced_disable_feature_flags) &&
                        (e.disable_flags = !0);
                    var r =
                        this._instance.config.__preview_flags_v2 &&
                        this._instance.config.__preview_remote_config;
                    r && (e.timezone = Qn()),
                        (this.he = !0),
                        this._instance.me({
                            method: "POST",
                            url: this._instance.requestRouter.endpointFor(
                                "api",
                                r ? "/flags/?v=2" : "/decide/?v=4"
                            ),
                            data: e,
                            compression: this._instance.config
                                .disable_compression
                                ? void 0
                                : g.Base64,
                            timeout:
                                this._instance.config
                                    .feature_flag_request_timeout_ms,
                            callback: (t) => {
                                var i,
                                    r,
                                    s = !0;
                                (200 === t.statusCode &&
                                    (this.ve ||
                                        (this.$anon_distinct_id = void 0),
                                    (s = !1)),
                                (this.he = !1),
                                this.ce) ||
                                    ((this.ce = !0),
                                    this._instance.be(
                                        null !== (r = t.json) && void 0 !== r
                                            ? r
                                            : {}
                                    ));
                                if (!e.disable_flags || this.ve)
                                    if (
                                        ((this.fe = !s),
                                        t.json &&
                                            null != (i = t.json.quotaLimited) &&
                                            i.includes(uo.FeatureFlags))
                                    )
                                        io.warn(
                                            "You have hit your feature flags quota limit, and will not be able to load feature flags until the quota is reset.  Please visit https://posthog.com/docs/billing/limits-alerts to learn more."
                                        );
                                    else {
                                        var n;
                                        if (!e.disable_flags)
                                            this.receivedFeatureFlags(
                                                null !== (n = t.json) &&
                                                    void 0 !== n
                                                    ? n
                                                    : {},
                                                s
                                            );
                                        this.ve && ((this.ve = !1), this.ge());
                                    }
                            },
                        });
                }
        }
        getFeatureFlag(t, i) {
            if (
                (void 0 === i && (i = {}),
                this.ue || (this.getFlags() && this.getFlags().length > 0))
            ) {
                var e = this.getFlagVariants()[t],
                    r = "" + e,
                    s = this._instance.get_property(oo) || void 0,
                    n = this._instance.get_property(Ft) || {};
                if (
                    (i.send_event || !("send_event" in i)) &&
                    (!(t in n) || !n[t].includes(r))
                ) {
                    var o, a, l, u, h, d, v, c, f;
                    x(n[t]) ? n[t].push(r) : (n[t] = [r]),
                        null == (o = this._instance.persistence) ||
                            o.register({ [Ft]: n });
                    var p = this.getFeatureFlagDetails(t),
                        g = {
                            $feature_flag: t,
                            $feature_flag_response: e,
                            $feature_flag_payload:
                                this.getFeatureFlagPayload(t) || null,
                            $feature_flag_request_id: s,
                            $feature_flag_bootstrapped_response:
                                (null ==
                                    (a = this._instance.config.bootstrap) ||
                                null == (a = a.featureFlags)
                                    ? void 0
                                    : a[t]) || null,
                            $feature_flag_bootstrapped_payload:
                                (null ==
                                    (l = this._instance.config.bootstrap) ||
                                null == (l = l.featureFlagPayloads)
                                    ? void 0
                                    : l[t]) || null,
                            $used_bootstrap_value: !this.fe,
                        };
                    R(
                        null == p || null == (u = p.metadata)
                            ? void 0
                            : u.version
                    ) || (g.$feature_flag_version = p.metadata.version);
                    var _,
                        m =
                            null !==
                                (h =
                                    null == p || null == (d = p.reason)
                                        ? void 0
                                        : d.description) && void 0 !== h
                                ? h
                                : null == p || null == (v = p.reason)
                                ? void 0
                                : v.code;
                    if (
                        (m && (g.$feature_flag_reason = m),
                        null != p &&
                            null != (c = p.metadata) &&
                            c.id &&
                            (g.$feature_flag_id = p.metadata.id),
                        (R(null == p ? void 0 : p.original_variant) &&
                            R(null == p ? void 0 : p.original_enabled)) ||
                            (g.$feature_flag_original_response = R(
                                p.original_variant
                            )
                                ? p.original_enabled
                                : p.original_variant),
                        null != p &&
                            null != (f = p.metadata) &&
                            f.original_payload)
                    )
                        g.$feature_flag_original_payload =
                            null == p || null == (_ = p.metadata)
                                ? void 0
                                : _.original_payload;
                    this._instance.capture("$feature_flag_called", g);
                }
                return e;
            }
            io.warn(
                'getFeatureFlag for key "' +
                    t +
                    "\" failed. Feature flags didn't load in time."
            );
        }
        getFeatureFlagDetails(t) {
            return this.getFlagsWithDetails()[t];
        }
        getFeatureFlagPayload(t) {
            return this.getFlagPayloads()[t];
        }
        getRemoteConfigPayload(t, i) {
            var e = this._instance.config.token;
            this._instance.me({
                method: "POST",
                url: this._instance.requestRouter.endpointFor(
                    "api",
                    "/decide/?v=4"
                ),
                data: {
                    distinct_id: this._instance.get_distinct_id(),
                    token: e,
                },
                compression: this._instance.config.disable_compression
                    ? void 0
                    : g.Base64,
                timeout: this._instance.config.feature_flag_request_timeout_ms,
                callback: (e) => {
                    var r,
                        s =
                            null == (r = e.json)
                                ? void 0
                                : r.featureFlagPayloads;
                    i((null == s ? void 0 : s[t]) || void 0);
                },
            });
        }
        isFeatureEnabled(t, i) {
            if (
                (void 0 === i && (i = {}),
                this.ue || (this.getFlags() && this.getFlags().length > 0))
            )
                return !!this.getFeatureFlag(t, i);
            io.warn(
                'isFeatureEnabled for key "' +
                    t +
                    "\" failed. Feature flags didn't load in time."
            );
        }
        addFeatureFlagsHandler(t) {
            this.featureFlagEventHandlers.push(t);
        }
        removeFeatureFlagsHandler(t) {
            this.featureFlagEventHandlers =
                this.featureFlagEventHandlers.filter((i) => i !== t);
        }
        receivedFeatureFlags(t, i) {
            if (this._instance.persistence) {
                this.ue = !0;
                var e = this.getFlagVariants(),
                    r = this.getFlagPayloads(),
                    s = this.getFlagsWithDetails();
                !(function (t, i, e, r, s) {
                    void 0 === e && (e = {}),
                        void 0 === r && (r = {}),
                        void 0 === s && (s = {});
                    var n = lo(t),
                        o = n.flags,
                        a = n.featureFlags,
                        l = n.featureFlagPayloads;
                    if (a) {
                        var u = t.requestId;
                        if (x(a)) {
                            io.warn(
                                "v1 of the feature flags endpoint is deprecated. Please use the latest version."
                            );
                            var h = {};
                            if (a)
                                for (var d = 0; d < a.length; d++) h[a[d]] = !0;
                            i && i.register({ [eo]: a, [It]: h });
                        } else {
                            var v = a,
                                c = l,
                                f = o;
                            t.errorsWhileComputingFlags &&
                                ((v = q({}, e, v)),
                                (c = q({}, r, c)),
                                (f = q({}, s, f))),
                                i &&
                                    i.register(
                                        q(
                                            {
                                                [eo]: Object.keys(ao(v)),
                                                [It]: v || {},
                                                [so]: c || {},
                                                [Rt]: f || {},
                                            },
                                            u ? { [oo]: u } : {}
                                        )
                                    );
                        }
                    }
                })(t, this._instance.persistence, e, r, s),
                    this.we(i);
            }
        }
        override(t, i) {
            void 0 === i && (i = !1),
                io.warn(
                    "override is deprecated. Please use overrideFeatureFlags instead."
                ),
                this.overrideFeatureFlags({ flags: t, suppressWarning: i });
        }
        overrideFeatureFlags(t) {
            if (!this._instance.__loaded || !this._instance.persistence)
                return io.uninitializedWarning(
                    "posthog.featureFlags.overrideFeatureFlags"
                );
            if (!1 === t)
                return (
                    this._instance.persistence.unregister(ro),
                    this._instance.persistence.unregister(no),
                    void this.we()
                );
            if (
                t &&
                "object" == typeof t &&
                ("flags" in t || "payloads" in t)
            ) {
                var i,
                    e = t;
                if (
                    ((this.le = Boolean(
                        null !== (i = e.suppressWarning) && void 0 !== i && i
                    )),
                    "flags" in e)
                )
                    if (!1 === e.flags)
                        this._instance.persistence.unregister(ro);
                    else if (e.flags)
                        if (x(e.flags)) {
                            for (var r = {}, s = 0; s < e.flags.length; s++)
                                r[e.flags[s]] = !0;
                            this._instance.persistence.register({ [ro]: r });
                        } else
                            this._instance.persistence.register({
                                [ro]: e.flags,
                            });
                return (
                    "payloads" in e &&
                        (!1 === e.payloads
                            ? this._instance.persistence.unregister(no)
                            : e.payloads &&
                              this._instance.persistence.register({
                                  [no]: e.payloads,
                              })),
                    void this.we()
                );
            }
            this.we();
        }
        onFeatureFlags(t) {
            if ((this.addFeatureFlagsHandler(t), this.ue)) {
                var { flags: i, flagVariants: e } = this.ye();
                t(i, e);
            }
            return () => this.removeFeatureFlagsHandler(t);
        }
        updateEarlyAccessFeatureEnrollment(t, i) {
            var e,
                r = (this._instance.get_property(Pt) || []).find(
                    (i) => i.flagKey === t
                ),
                s = { ["$feature_enrollment/" + t]: i },
                n = { $feature_flag: t, $feature_enrollment: i, $set: s };
            r && (n.$early_access_feature_name = r.name),
                this._instance.capture("$feature_enrollment_update", n),
                this.setPersonPropertiesForFlags(s, !1);
            var o = q({}, this.getFlagVariants(), { [t]: i });
            null == (e = this._instance.persistence) ||
                e.register({ [eo]: Object.keys(ao(o)), [It]: o }),
                this.we();
        }
        getEarlyAccessFeatures(t, i, e) {
            void 0 === i && (i = !1);
            var r = this._instance.get_property(Pt),
                s = e ? "&" + e.map((t) => "stage=" + t).join("&") : "";
            if (r && !i) return t(r);
            this._instance.me({
                url: this._instance.requestRouter.endpointFor(
                    "api",
                    "/api/early_access_features/?token=" +
                        this._instance.config.token +
                        s
                ),
                method: "GET",
                callback: (i) => {
                    var e;
                    if (i.json) {
                        var r = i.json.earlyAccessFeatures;
                        return (
                            null == (e = this._instance.persistence) ||
                                e.register({ [Pt]: r }),
                            t(r)
                        );
                    }
                },
            });
        }
        ye() {
            var t = this.getFlags(),
                i = this.getFlagVariants();
            return {
                flags: t.filter((t) => i[t]),
                flagVariants: Object.keys(i)
                    .filter((t) => i[t])
                    .reduce((t, e) => ((t[e] = i[e]), t), {}),
            };
        }
        we(t) {
            var { flags: i, flagVariants: e } = this.ye();
            this.featureFlagEventHandlers.forEach((r) =>
                r(i, e, { errorsLoading: t })
            );
        }
        setPersonPropertiesForFlags(t, i) {
            void 0 === i && (i = !0);
            var e = this._instance.get_property(Tt) || {};
            this._instance.register({ [Tt]: q({}, e, t) }),
                i && this._instance.reloadFeatureFlags();
        }
        resetPersonPropertiesForFlags() {
            this._instance.unregister(Tt);
        }
        setGroupPropertiesForFlags(t, i) {
            void 0 === i && (i = !0);
            var e = this._instance.get_property(Mt) || {};
            0 !== Object.keys(e).length &&
                Object.keys(e).forEach((i) => {
                    (e[i] = q({}, e[i], t[i])), delete t[i];
                }),
                this._instance.register({ [Mt]: q({}, e, t) }),
                i && this._instance.reloadFeatureFlags();
        }
        resetGroupPropertiesForFlags(t) {
            if (t) {
                var i = this._instance.get_property(Mt) || {};
                this._instance.register({ [Mt]: q({}, i, { [t]: {} }) });
            } else this._instance.unregister(Mt);
        }
    }
    var vo = [
        "cookie",
        "localstorage",
        "localstorage+cookie",
        "sessionstorage",
        "memory",
    ];
    class co {
        constructor(t) {
            (this.S = t),
                (this.props = {}),
                (this.Se = !1),
                (this.$e = ((t) => {
                    var i = "";
                    return (
                        t.token &&
                            (i = t.token
                                .replace(/\+/g, "PL")
                                .replace(/\//g, "SL")
                                .replace(/=/g, "EQ")),
                        t.persistence_name
                            ? "ph_" + t.persistence_name
                            : "ph_" + i + "_posthog"
                    );
                })(t)),
                (this.B = this.ke(t)),
                this.load(),
                t.debug &&
                    j.info(
                        "Persistence loaded",
                        t.persistence,
                        q({}, this.props)
                    ),
                this.update_config(t, t),
                this.save();
        }
        ke(t) {
            -1 === vo.indexOf(t.persistence.toLowerCase()) &&
                (j.critical(
                    "Unknown persistence type " +
                        t.persistence +
                        "; falling back to localStorage+cookie"
                ),
                (t.persistence = "localStorage+cookie"));
            var i = t.persistence.toLowerCase();
            return "localstorage" === i && Wi.O()
                ? Wi
                : "localstorage+cookie" === i && Ji.O()
                ? Ji
                : "sessionstorage" === i && Xi.O()
                ? Xi
                : "memory" === i
                ? Ki
                : "cookie" === i
                ? qi
                : Ji.O()
                ? Ji
                : qi;
        }
        properties() {
            var t = {};
            return (
                J(this.props, function (i, e) {
                    if (e === It && I(i))
                        for (var r = Object.keys(i), n = 0; n < r.length; n++)
                            t["$feature/" + r[n]] = i[r[n]];
                    else
                        (a = e),
                            (l = !1),
                            (C((o = Ht))
                                ? l
                                : s && o.indexOf === s
                                ? -1 != o.indexOf(a)
                                : (J(o, function (t) {
                                      if (l || (l = t === a)) return W;
                                  }),
                                  l)) || (t[e] = i);
                    var o, a, l;
                }),
                t
            );
        }
        load() {
            if (!this.xe) {
                var t = this.B.D(this.$e);
                t && (this.props = V({}, t));
            }
        }
        save() {
            this.xe ||
                this.B.L(
                    this.$e,
                    this.props,
                    this.Ee,
                    this.Ie,
                    this.Pe,
                    this.S.debug
                );
        }
        remove() {
            this.B.N(this.$e, !1), this.B.N(this.$e, !0);
        }
        clear() {
            this.remove(), (this.props = {});
        }
        register_once(t, i, e) {
            if (I(t)) {
                R(i) && (i = "None"), (this.Ee = R(e) ? this.Re : e);
                var r = !1;
                if (
                    (J(t, (t, e) => {
                        (this.props.hasOwnProperty(e) && this.props[e] !== i) ||
                            ((this.props[e] = t), (r = !0));
                    }),
                    r)
                )
                    return this.save(), !0;
            }
            return !1;
        }
        register(t, i) {
            if (I(t)) {
                this.Ee = R(i) ? this.Re : i;
                var e = !1;
                if (
                    (J(t, (i, r) => {
                        t.hasOwnProperty(r) &&
                            this.props[r] !== i &&
                            ((this.props[r] = i), (e = !0));
                    }),
                    e)
                )
                    return this.save(), !0;
            }
            return !1;
        }
        unregister(t) {
            t in this.props && (delete this.props[t], this.save());
        }
        update_campaign_params() {
            if (!this.Se) {
                var t = Wn(
                    this.S.custom_campaign_params,
                    this.S.mask_personal_data_properties,
                    this.S.custom_personal_data_properties
                );
                P(Z(t)) || this.register(t), (this.Se = !0);
            }
        }
        update_search_keyword() {
            var t;
            this.register((t = null == o ? void 0 : o.referrer) ? Jn(t) : {});
        }
        update_referrer_info() {
            var t;
            this.register_once(
                {
                    $referrer: Kn(),
                    $referring_domain:
                        (null != o &&
                            o.referrer &&
                            (null == (t = yi(o.referrer)) ? void 0 : t.host)) ||
                        "$direct",
                },
                void 0
            );
        }
        set_initial_person_info() {
            this.props[Nt] ||
                this.props[jt] ||
                this.register_once(
                    {
                        [zt]: Yn(
                            this.S.mask_personal_data_properties,
                            this.S.custom_personal_data_properties
                        ),
                    },
                    void 0
                );
        }
        get_initial_props() {
            var t = {};
            J([jt, Nt], (i) => {
                var e = this.props[i];
                e &&
                    J(e, function (i, e) {
                        t["$initial_" + w(e)] = i;
                    });
            });
            var i,
                e,
                r = this.props[zt];
            if (r) {
                var s =
                    ((i = Xn(r)),
                    (e = {}),
                    J(i, function (t, i) {
                        e["$initial_" + w(i)] = t;
                    }),
                    e);
                V(t, s);
            }
            return t;
        }
        safe_merge(t) {
            return (
                J(this.props, function (i, e) {
                    e in t || (t[e] = i);
                }),
                t
            );
        }
        update_config(t, i) {
            if (
                ((this.Re = this.Ee = t.cookie_expiration),
                this.set_disabled(t.disable_persistence),
                this.set_cross_subdomain(t.cross_subdomain_cookie),
                this.set_secure(t.secure_cookie),
                t.persistence !== i.persistence)
            ) {
                var e = this.ke(t),
                    r = this.props;
                this.clear(), (this.B = e), (this.props = r), this.save();
            }
        }
        set_disabled(t) {
            (this.xe = t), this.xe ? this.remove() : this.save();
        }
        set_cross_subdomain(t) {
            t !== this.Ie && ((this.Ie = t), this.remove(), this.save());
        }
        set_secure(t) {
            t !== this.Pe && ((this.Pe = t), this.remove(), this.save());
        }
        set_event_timer(t, i) {
            var e = this.props[at] || {};
            (e[t] = i), (this.props[at] = e), this.save();
        }
        remove_event_timer(t) {
            var i = (this.props[at] || {})[t];
            return R(i) || (delete this.props[at][t], this.save()), i;
        }
        get_property(t) {
            return this.props[t];
        }
        set_property(t, i) {
            (this.props[t] = i), this.save();
        }
    }
    class fo {
        constructor() {
            (this.Te = {}), (this.Te = {});
        }
        on(t, i) {
            return (
                this.Te[t] || (this.Te[t] = []),
                this.Te[t].push(i),
                () => {
                    this.Te[t] = this.Te[t].filter((t) => t !== i);
                }
            );
        }
        emit(t, i) {
            for (var e of this.Te[t] || []) e(i);
            for (var r of this.Te["*"] || []) r(t, i);
        }
    }
    class po {
        constructor(t) {
            (this.Me = new fo()),
                (this.Ce = (t, i) =>
                    this.Oe(t, i) && this.Fe(t, i) && this.Ae(t, i)),
                (this.Oe = (t, i) =>
                    null == i ||
                    !i.event ||
                    (null == t ? void 0 : t.event) ===
                        (null == i ? void 0 : i.event)),
                (this._instance = t),
                (this.De = new Set()),
                (this.Le = new Set());
        }
        init() {
            var t;
            if (!R(null == (t = this._instance) ? void 0 : t.Ne)) {
                var i;
                null == (i = this._instance) ||
                    i.Ne((t, i) => {
                        this.on(t, i);
                    });
            }
        }
        register(t) {
            var i, e;
            if (
                !R(null == (i = this._instance) ? void 0 : i.Ne) &&
                (t.forEach((t) => {
                    var i, e;
                    null == (i = this.Le) || i.add(t),
                        null == (e = t.steps) ||
                            e.forEach((t) => {
                                var i;
                                null == (i = this.De) ||
                                    i.add((null == t ? void 0 : t.event) || "");
                            });
                }),
                null != (e = this._instance) && e.autocapture)
            ) {
                var r,
                    s = new Set();
                t.forEach((t) => {
                    var i;
                    null == (i = t.steps) ||
                        i.forEach((t) => {
                            null != t &&
                                t.selector &&
                                s.add(null == t ? void 0 : t.selector);
                        });
                }),
                    null == (r = this._instance) ||
                        r.autocapture.setElementSelectors(s);
            }
        }
        on(t, i) {
            var e;
            null != i &&
                0 != t.length &&
                (this.De.has(t) || this.De.has(null == i ? void 0 : i.event)) &&
                this.Le &&
                (null == (e = this.Le) ? void 0 : e.size) > 0 &&
                this.Le.forEach((t) => {
                    this.je(i, t) && this.Me.emit("actionCaptured", t.name);
                });
        }
        ze(t) {
            this.onAction("actionCaptured", (i) => t(i));
        }
        je(t, i) {
            if (null == (null == i ? void 0 : i.steps)) return !1;
            for (var e of i.steps) if (this.Ce(t, e)) return !0;
            return !1;
        }
        onAction(t, i) {
            return this.Me.on(t, i);
        }
        Fe(t, i) {
            if (null != i && i.url) {
                var e,
                    r =
                        null == t || null == (e = t.properties)
                            ? void 0
                            : e.$current_url;
                if (!r || "string" != typeof r) return !1;
                if (
                    !po.Ue(
                        r,
                        null == i ? void 0 : i.url,
                        (null == i ? void 0 : i.url_matching) || "contains"
                    )
                )
                    return !1;
            }
            return !0;
        }
        static Ue(i, e, r) {
            switch (r) {
                case "regex":
                    return !!t && Ns(i, e);
                case "exact":
                    return e === i;
                case "contains":
                    var s = po.Be(e).replace(/_/g, ".").replace(/%/g, ".*");
                    return Ns(i, s);
                default:
                    return !1;
            }
        }
        static Be(t) {
            return t
                .replace(/[|\\{}()[\]^$+*?.]/g, "\\$&")
                .replace(/-/g, "\\x2d");
        }
        Ae(t, i) {
            if (
                ((null != i && i.href) ||
                    (null != i && i.tag_name) ||
                    (null != i && i.text)) &&
                !this.qe(t).some(
                    (t) =>
                        !(
                            null != i &&
                            i.href &&
                            !po.Ue(
                                t.href || "",
                                null == i ? void 0 : i.href,
                                (null == i ? void 0 : i.href_matching) ||
                                    "exact"
                            )
                        ) &&
                        (null == i ||
                            !i.tag_name ||
                            t.tag_name === (null == i ? void 0 : i.tag_name)) &&
                        !(
                            null != i &&
                            i.text &&
                            !po.Ue(
                                t.text || "",
                                null == i ? void 0 : i.text,
                                (null == i ? void 0 : i.text_matching) ||
                                    "exact"
                            ) &&
                            !po.Ue(
                                t.$el_text || "",
                                null == i ? void 0 : i.text,
                                (null == i ? void 0 : i.text_matching) ||
                                    "exact"
                            )
                        )
                )
            )
                return !1;
            if (null != i && i.selector) {
                var e,
                    r =
                        null == t || null == (e = t.properties)
                            ? void 0
                            : e.$element_selectors;
                if (!r) return !1;
                if (!r.includes(null == i ? void 0 : i.selector)) return !1;
            }
            return !0;
        }
        qe(t) {
            return null == (null == t ? void 0 : t.properties.$elements)
                ? []
                : null == t
                ? void 0
                : t.properties.$elements;
        }
    }
    var go = z("[Surveys]");
    class _o {
        constructor(t) {
            (this._instance = t), (this.He = new Map()), (this.We = new Map());
        }
        register(t) {
            var i;
            R(null == (i = this._instance) ? void 0 : i.Ne) ||
                (this.Ge(t), this.Je(t));
        }
        Je(t) {
            var i = t.filter((t) => {
                var i, e;
                return (
                    (null == (i = t.conditions) ? void 0 : i.actions) &&
                    (null == (e = t.conditions) ||
                    null == (e = e.actions) ||
                    null == (e = e.values)
                        ? void 0
                        : e.length) > 0
                );
            });
            if (0 !== i.length) {
                if (null == this.Ve) {
                    (this.Ve = new po(this._instance)), this.Ve.init();
                    this.Ve.ze((t) => {
                        this.onAction(t);
                    });
                }
                i.forEach((t) => {
                    var i, e, r, s, n;
                    t.conditions &&
                        null != (i = t.conditions) &&
                        i.actions &&
                        null != (e = t.conditions) &&
                        null != (e = e.actions) &&
                        e.values &&
                        (null == (r = t.conditions) ||
                        null == (r = r.actions) ||
                        null == (r = r.values)
                            ? void 0
                            : r.length) > 0 &&
                        (null == (s = this.Ve) ||
                            s.register(t.conditions.actions.values),
                        null == (n = t.conditions) ||
                            null == (n = n.actions) ||
                            null == (n = n.values) ||
                            n.forEach((i) => {
                                if (i && i.name) {
                                    var e = this.We.get(i.name);
                                    e && e.push(t.id),
                                        this.We.set(i.name, e || [t.id]);
                                }
                            }));
                });
            }
        }
        Ge(t) {
            var i;
            if (
                0 !==
                t.filter((t) => {
                    var i, e;
                    return (
                        (null == (i = t.conditions) ? void 0 : i.events) &&
                        (null == (e = t.conditions) ||
                        null == (e = e.events) ||
                        null == (e = e.values)
                            ? void 0
                            : e.length) > 0
                    );
                }).length
            ) {
                null == (i = this._instance) ||
                    i.Ne((t, i) => {
                        this.onEvent(t, i);
                    }),
                    t.forEach((t) => {
                        var i;
                        null == (i = t.conditions) ||
                            null == (i = i.events) ||
                            null == (i = i.values) ||
                            i.forEach((i) => {
                                if (i && i.name) {
                                    var e = this.He.get(i.name);
                                    e && e.push(t.id),
                                        this.He.set(i.name, e || [t.id]);
                                }
                            });
                    });
            }
        }
        onEvent(t, i) {
            var e,
                r =
                    (null == (e = this._instance) || null == (e = e.persistence)
                        ? void 0
                        : e.props[Ot]) || [];
            if ("survey shown" === t && i && r.length > 0) {
                var s;
                go.info(
                    "survey event matched, removing survey from activated surveys",
                    { event: t, eventPayload: i, existingActivatedSurveys: r }
                );
                var n =
                    null == i || null == (s = i.properties)
                        ? void 0
                        : s.$survey_id;
                if (n) {
                    var o = r.indexOf(n);
                    o >= 0 && (r.splice(o, 1), this.Ke(r));
                }
            } else
                this.He.has(t) &&
                    (go.info(
                        "survey event matched, updating activated surveys",
                        { event: t, surveys: this.He.get(t) }
                    ),
                    this.Ke(r.concat(this.He.get(t) || [])));
        }
        onAction(t) {
            var i,
                e =
                    (null == (i = this._instance) || null == (i = i.persistence)
                        ? void 0
                        : i.props[Ot]) || [];
            this.We.has(t) && this.Ke(e.concat(this.We.get(t) || []));
        }
        Ke(t) {
            var i;
            null == (i = this._instance) ||
                null == (i = i.persistence) ||
                i.register({ [Ot]: [...new Set(t)] });
        }
        getSurveys() {
            var t,
                i =
                    null == (t = this._instance) || null == (t = t.persistence)
                        ? void 0
                        : t.props[Ot];
            return i || [];
        }
        getEventToSurveys() {
            return this.He;
        }
        Ye() {
            return this.Ve;
        }
    }
    class mo {
        constructor(t) {
            (this.Xe = null),
                (this.Qe = !1),
                (this.Ze = !1),
                (this.tr = []),
                (this._instance = t),
                (this._surveyEventReceiver = null);
        }
        onRemoteConfig(t) {
            var i = t.surveys;
            if (O(i))
                return go.warn("Decide not loaded yet. Not loading surveys.");
            var e = x(i);
            (this.ir = e ? i.length > 0 : i),
                go.info("decide response received, hasSurveys: " + this.ir),
                this.ir && this.loadIfEnabled();
        }
        reset() {
            localStorage.removeItem("lastSeenSurveyDate");
            for (var t = [], i = 0; i < localStorage.length; i++) {
                var e = localStorage.key(i);
                ((null != e && e.startsWith("seenSurvey_")) ||
                    (null != e && e.startsWith("inProgressSurvey_"))) &&
                    t.push(e);
            }
            t.forEach((t) => localStorage.removeItem(t));
        }
        loadIfEnabled() {
            if (!this.Xe)
                if (this.Ze)
                    go.info("Already initializing surveys, skipping...");
                else if (this._instance.config.disable_surveys)
                    go.info("Disabled. Not loading surveys.");
                else if (this.ir) {
                    var t = null == v ? void 0 : v.__PosthogExtensions__;
                    if (t) {
                        this.Ze = !0;
                        try {
                            var i = t.generateSurveys;
                            if (i) return void this.er(i);
                            var e = t.loadExternalDependency;
                            if (!e)
                                return void this.rr(
                                    "PostHog loadExternalDependency extension not found."
                                );
                            e(this._instance, "surveys", (i) => {
                                i || !t.generateSurveys
                                    ? this.rr(
                                          "Could not load surveys script",
                                          i
                                      )
                                    : this.er(t.generateSurveys);
                            });
                        } catch (t) {
                            throw (this.rr("Error initializing surveys", t), t);
                        } finally {
                            this.Ze = !1;
                        }
                    } else go.error("PostHog Extensions not found.");
                } else go.info("No surveys to load.");
        }
        er(t) {
            (this.Xe = t(this._instance)),
                (this._surveyEventReceiver = new _o(this._instance)),
                go.info("Surveys loaded successfully"),
                this.sr({ isLoaded: !0 });
        }
        rr(t, i) {
            go.error(t, i), this.sr({ isLoaded: !1, error: t });
        }
        onSurveysLoaded(t) {
            return (
                this.tr.push(t),
                this.Xe && this.sr({ isLoaded: !0 }),
                () => {
                    this.tr = this.tr.filter((i) => i !== t);
                }
            );
        }
        getSurveys(t, i) {
            if (
                (void 0 === i && (i = !1),
                this._instance.config.disable_surveys)
            )
                return go.info("Disabled. Not loading surveys."), t([]);
            var e = this._instance.get_property(Ct);
            if (e && !i) return t(e, { isLoaded: !0 });
            if (this.Qe)
                return t([], {
                    isLoaded: !1,
                    error: "Surveys are already being loaded",
                });
            try {
                (this.Qe = !0),
                    this._instance.me({
                        url: this._instance.requestRouter.endpointFor(
                            "api",
                            "/api/surveys/?token=" + this._instance.config.token
                        ),
                        method: "GET",
                        timeout:
                            this._instance.config.surveys_request_timeout_ms,
                        callback: (i) => {
                            var e;
                            this.Qe = !1;
                            var r = i.statusCode;
                            if (200 !== r || !i.json) {
                                var s =
                                    "Surveys API could not be loaded, status: " +
                                    r;
                                return (
                                    go.error(s),
                                    t([], { isLoaded: !1, error: s })
                                );
                            }
                            var n,
                                o = i.json.surveys || [],
                                a = o.filter(
                                    (t) =>
                                        (function (t) {
                                            return !(
                                                !t.start_date || t.end_date
                                            );
                                        })(t) &&
                                        ((function (t) {
                                            var i;
                                            return !(
                                                null == (i = t.conditions) ||
                                                null == (i = i.events) ||
                                                null == (i = i.values) ||
                                                !i.length
                                            );
                                        })(t) ||
                                            (function (t) {
                                                var i;
                                                return !(
                                                    null ==
                                                        (i = t.conditions) ||
                                                    null == (i = i.actions) ||
                                                    null == (i = i.values) ||
                                                    !i.length
                                                );
                                            })(t))
                                );
                            a.length > 0 &&
                                (null == (n = this._surveyEventReceiver) ||
                                    n.register(a));
                            return (
                                null == (e = this._instance.persistence) ||
                                    e.register({ [Ct]: o }),
                                t(o, { isLoaded: !0 })
                            );
                        },
                    });
            } catch (t) {
                throw ((this.Qe = !1), t);
            }
        }
        sr(t) {
            for (var i of this.tr)
                try {
                    t.isLoaded ? this.getSurveys(i) : i([], t);
                } catch (t) {
                    go.error("Error in survey callback", t);
                }
        }
        getActiveMatchingSurveys(t, i) {
            if ((void 0 === i && (i = !1), !O(this.Xe)))
                return this.Xe.getActiveMatchingSurveys(t, i);
            go.warn("init was not called");
        }
        nr(t) {
            var i = null;
            return (
                this.getSurveys((e) => {
                    var r;
                    i =
                        null !== (r = e.find((i) => i.id === t)) && void 0 !== r
                            ? r
                            : null;
                }),
                i
            );
        }
        ar(t) {
            if (O(this.Xe))
                return {
                    eligible: !1,
                    reason: "SDK is not enabled or survey functionality is not yet loaded",
                };
            var i = "string" == typeof t ? this.nr(t) : t;
            return i
                ? this.Xe.checkSurveyEligibility(i)
                : { eligible: !1, reason: "Survey not found" };
        }
        canRenderSurvey(t) {
            if (O(this.Xe))
                return (
                    go.warn("init was not called"),
                    {
                        visible: !1,
                        disabledReason:
                            "SDK is not enabled or survey functionality is not yet loaded",
                    }
                );
            var i = this.ar(t);
            return { visible: i.eligible, disabledReason: i.reason };
        }
        canRenderSurveyAsync(t, i) {
            return O(this.Xe)
                ? (go.warn("init was not called"),
                  Promise.resolve({
                      visible: !1,
                      disabledReason:
                          "SDK is not enabled or survey functionality is not yet loaded",
                  }))
                : new Promise((e) => {
                      this.getSurveys((i) => {
                          var r,
                              s =
                                  null !== (r = i.find((i) => i.id === t)) &&
                                  void 0 !== r
                                      ? r
                                      : null;
                          if (s) {
                              var n = this.ar(s);
                              e({
                                  visible: n.eligible,
                                  disabledReason: n.reason,
                              });
                          } else
                              e({
                                  visible: !1,
                                  disabledReason: "Survey not found",
                              });
                      }, i);
                  });
        }
        renderSurvey(t, i) {
            if (O(this.Xe)) go.warn("init was not called");
            else {
                var e = this.nr(t),
                    r = null == o ? void 0 : o.querySelector(i);
                e
                    ? r
                        ? this.Xe.renderSurvey(e, r)
                        : go.warn("Survey element not found")
                    : go.warn("Survey not found");
            }
        }
    }
    var bo = z("[RateLimiter]");
    class wo {
        constructor(t) {
            var i, e;
            (this.serverLimits = {}),
                (this.lastEventRateLimited = !1),
                (this.checkForLimiting = (t) => {
                    var i = t.text;
                    if (i && i.length)
                        try {
                            (JSON.parse(i).quota_limited || []).forEach((t) => {
                                bo.info((t || "events") + " is quota limited."),
                                    (this.serverLimits[t] =
                                        new Date().getTime() + 6e4);
                            });
                        } catch (t) {
                            return void bo.warn(
                                'could not rate limit - continuing. Error: "' +
                                    (null == t ? void 0 : t.message) +
                                    '"',
                                { text: i }
                            );
                        }
                }),
                (this.instance = t),
                (this.captureEventsPerSecond =
                    (null == (i = t.config.rate_limiting)
                        ? void 0
                        : i.events_per_second) || 10),
                (this.captureEventsBurstLimit = Math.max(
                    (null == (e = t.config.rate_limiting)
                        ? void 0
                        : e.events_burst_limit) ||
                        10 * this.captureEventsPerSecond,
                    this.captureEventsPerSecond
                )),
                (this.lastEventRateLimited = this.clientRateLimitContext(
                    !0
                ).isRateLimited);
        }
        clientRateLimitContext(t) {
            var i, e, r;
            void 0 === t && (t = !1);
            var s = new Date().getTime(),
                n =
                    null !==
                        (i =
                            null == (e = this.instance.persistence)
                                ? void 0
                                : e.get_property(Lt)) && void 0 !== i
                        ? i
                        : { tokens: this.captureEventsBurstLimit, last: s };
            (n.tokens += ((s - n.last) / 1e3) * this.captureEventsPerSecond),
                (n.last = s),
                n.tokens > this.captureEventsBurstLimit &&
                    (n.tokens = this.captureEventsBurstLimit);
            var o = n.tokens < 1;
            return (
                o || t || (n.tokens = Math.max(0, n.tokens - 1)),
                !o ||
                    this.lastEventRateLimited ||
                    t ||
                    this.instance.capture(
                        "$$client_ingestion_warning",
                        {
                            $$client_ingestion_warning_message:
                                "posthog-js client rate limited. Config is set to " +
                                this.captureEventsPerSecond +
                                " events per second and " +
                                this.captureEventsBurstLimit +
                                " events burst limit.",
                        },
                        { skip_client_rate_limiting: !0 }
                    ),
                (this.lastEventRateLimited = o),
                null == (r = this.instance.persistence) ||
                    r.set_property(Lt, n),
                { isRateLimited: o, remainingTokens: n.tokens }
            );
        }
        isServerRateLimited(t) {
            var i = this.serverLimits[t || "events"] || !1;
            return !1 !== i && new Date().getTime() < i;
        }
    }
    var yo = z("[RemoteConfig]");
    class So {
        constructor(t) {
            this._instance = t;
        }
        get remoteConfig() {
            var t;
            return null == (t = v._POSTHOG_REMOTE_CONFIG) ||
                null == (t = t[this._instance.config.token])
                ? void 0
                : t.config;
        }
        lr(t) {
            var i, e;
            null != (i = v.__PosthogExtensions__) && i.loadExternalDependency
                ? null == (e = v.__PosthogExtensions__) ||
                  null == e.loadExternalDependency ||
                  e.loadExternalDependency(
                      this._instance,
                      "remote-config",
                      () => t(this.remoteConfig)
                  )
                : (yo.error(
                      "PostHog Extensions not found. Cannot load remote config."
                  ),
                  t());
        }
        ur(t) {
            this._instance.me({
                method: "GET",
                url: this._instance.requestRouter.endpointFor(
                    "assets",
                    "/array/" + this._instance.config.token + "/config"
                ),
                callback: (i) => {
                    t(i.json);
                },
            });
        }
        load() {
            try {
                if (this.remoteConfig)
                    return (
                        yo.info(
                            "Using preloaded remote config",
                            this.remoteConfig
                        ),
                        void this.be(this.remoteConfig)
                    );
                if (this._instance.config.advanced_disable_decide)
                    return void yo.warn(
                        "Remote config is disabled. Falling back to local config."
                    );
                this.lr((t) => {
                    if (!t)
                        return (
                            yo.info(
                                "No config found after loading remote JS config. Falling back to JSON."
                            ),
                            void this.ur((t) => {
                                this.be(t);
                            })
                        );
                    this.be(t);
                });
            } catch (t) {
                yo.error("Error loading remote config", t);
            }
        }
        be(t) {
            t
                ? this._instance.config.__preview_remote_config
                    ? (this._instance.be(t),
                      !1 !== t.hasFeatureFlags &&
                          this._instance.featureFlags.ensureFlagsLoaded())
                    : yo.info(
                          "__preview_remote_config is disabled. Logging config instead",
                          t
                      )
                : yo.error("Failed to fetch remote config from PostHog.");
        }
    }
    var $o = 3e3;
    class ko {
        constructor(t, i) {
            (this.hr = !0),
                (this.dr = []),
                (this.vr = Xe(
                    (null == i ? void 0 : i.flush_interval_ms) || $o,
                    250,
                    5e3,
                    "flush interval",
                    $o
                )),
                (this.cr = t);
        }
        enqueue(t) {
            this.dr.push(t), this.pr || this.gr();
        }
        unload() {
            this._r();
            var t = this.dr.length > 0 ? this.mr() : {},
                i = Object.values(t);
            [
                ...i.filter((t) => 0 === t.url.indexOf("/e")),
                ...i.filter((t) => 0 !== t.url.indexOf("/e")),
            ].map((t) => {
                this.cr(q({}, t, { transport: "sendBeacon" }));
            });
        }
        enable() {
            (this.hr = !1), this.gr();
        }
        gr() {
            var t = this;
            this.hr ||
                (this.pr = setTimeout(() => {
                    if ((this._r(), this.dr.length > 0)) {
                        var i = this.mr(),
                            e = function () {
                                var e = i[r],
                                    s = new Date().getTime();
                                e.data &&
                                    x(e.data) &&
                                    J(e.data, (t) => {
                                        (t.offset = Math.abs(t.timestamp - s)),
                                            delete t.timestamp;
                                    }),
                                    t.cr(e);
                            };
                        for (var r in i) e();
                    }
                }, this.vr));
        }
        _r() {
            clearTimeout(this.pr), (this.pr = void 0);
        }
        mr() {
            var t = {};
            return (
                J(this.dr, (i) => {
                    var e,
                        r = i,
                        s = (r ? r.batchKey : null) || r.url;
                    R(t[s]) && (t[s] = q({}, r, { data: [] })),
                        null == (e = t[s].data) || e.push(r.data);
                }),
                (this.dr = []),
                t
            );
        }
    }
    var xo = ["retriesPerformedSoFar"];
    class Eo {
        constructor(i) {
            (this.br = !1),
                (this.wr = 3e3),
                (this.dr = []),
                (this._instance = i),
                (this.dr = []),
                (this.yr = !0),
                !R(t) &&
                    "onLine" in t.navigator &&
                    ((this.yr = t.navigator.onLine),
                    st(t, "online", () => {
                        (this.yr = !0), this.Yi();
                    }),
                    st(t, "offline", () => {
                        this.yr = !1;
                    }));
        }
        get length() {
            return this.dr.length;
        }
        retriableRequest(t) {
            var { retriesPerformedSoFar: i } = t,
                e = H(t, xo);
            F(i) && i > 0 && (e.url = Fs(e.url, { retry_count: i })),
                this._instance.me(
                    q({}, e, {
                        callback: (t) => {
                            200 !== t.statusCode &&
                            (t.statusCode < 400 || t.statusCode >= 500) &&
                            (null != i ? i : 0) < 10
                                ? this.Sr(q({ retriesPerformedSoFar: i }, e))
                                : null == e.callback || e.callback(t);
                        },
                    })
                );
        }
        Sr(t) {
            var i = t.retriesPerformedSoFar || 0;
            t.retriesPerformedSoFar = i + 1;
            var e = (function (t) {
                    var i = 3e3 * Math.pow(2, t),
                        e = i / 2,
                        r = Math.min(18e5, i),
                        s = (Math.random() - 0.5) * (r - e);
                    return Math.ceil(r + s);
                })(i),
                r = Date.now() + e;
            this.dr.push({ retryAt: r, requestOptions: t });
            var s = "Enqueued failed request for retry in " + e;
            navigator.onLine || (s += " (Browser is offline)"),
                j.warn(s),
                this.br || ((this.br = !0), this.$r());
        }
        $r() {
            this.kr && clearTimeout(this.kr),
                (this.kr = setTimeout(() => {
                    this.yr && this.dr.length > 0 && this.Yi(), this.$r();
                }, this.wr));
        }
        Yi() {
            var t = Date.now(),
                i = [],
                e = this.dr.filter((e) => e.retryAt < t || (i.push(e), !1));
            if (((this.dr = i), e.length > 0))
                for (var { requestOptions: r } of e) this.retriableRequest(r);
        }
        unload() {
            for (var { requestOptions: t } of (this.kr &&
                (clearTimeout(this.kr), (this.kr = void 0)),
            this.dr))
                try {
                    this._instance.me(q({}, t, { transport: "sendBeacon" }));
                } catch (t) {
                    j.error(t);
                }
            this.dr = [];
        }
    }
    class Io {
        constructor(t) {
            (this.Er = () => {
                var t, i, e, r;
                this.Ir || (this.Ir = {});
                var s = this.scrollElement(),
                    n = this.scrollY(),
                    o = s ? Math.max(0, s.scrollHeight - s.clientHeight) : 0,
                    a = n + ((null == s ? void 0 : s.clientHeight) || 0),
                    l = (null == s ? void 0 : s.scrollHeight) || 0;
                (this.Ir.lastScrollY = Math.ceil(n)),
                    (this.Ir.maxScrollY = Math.max(
                        n,
                        null !== (t = this.Ir.maxScrollY) && void 0 !== t
                            ? t
                            : 0
                    )),
                    (this.Ir.maxScrollHeight = Math.max(
                        o,
                        null !== (i = this.Ir.maxScrollHeight) && void 0 !== i
                            ? i
                            : 0
                    )),
                    (this.Ir.lastContentY = a),
                    (this.Ir.maxContentY = Math.max(
                        a,
                        null !== (e = this.Ir.maxContentY) && void 0 !== e
                            ? e
                            : 0
                    )),
                    (this.Ir.maxContentHeight = Math.max(
                        l,
                        null !== (r = this.Ir.maxContentHeight) && void 0 !== r
                            ? r
                            : 0
                    ));
            }),
                (this._instance = t);
        }
        getContext() {
            return this.Ir;
        }
        resetContext() {
            var t = this.Ir;
            return setTimeout(this.Er, 0), t;
        }
        startMeasuringScrollPosition() {
            st(t, "scroll", this.Er, { capture: !0 }),
                st(t, "scrollend", this.Er, { capture: !0 }),
                st(t, "resize", this.Er);
        }
        scrollElement() {
            if (!this._instance.config.scroll_root_selector)
                return null == t ? void 0 : t.document.documentElement;
            var i = x(this._instance.config.scroll_root_selector)
                ? this._instance.config.scroll_root_selector
                : [this._instance.config.scroll_root_selector];
            for (var e of i) {
                var r = null == t ? void 0 : t.document.querySelector(e);
                if (r) return r;
            }
        }
        scrollY() {
            if (this._instance.config.scroll_root_selector) {
                var i = this.scrollElement();
                return (i && i.scrollTop) || 0;
            }
            return (
                (t &&
                    (t.scrollY ||
                        t.pageYOffset ||
                        t.document.documentElement.scrollTop)) ||
                0
            );
        }
        scrollX() {
            if (this._instance.config.scroll_root_selector) {
                var i = this.scrollElement();
                return (i && i.scrollLeft) || 0;
            }
            return (
                (t &&
                    (t.scrollX ||
                        t.pageXOffset ||
                        t.document.documentElement.scrollLeft)) ||
                0
            );
        }
    }
    var Po = (t) =>
        Yn(
            null == t ? void 0 : t.config.mask_personal_data_properties,
            null == t ? void 0 : t.config.custom_personal_data_properties
        );
    class Ro {
        constructor(t, i, e, r) {
            (this.Pr = (t) => {
                var i = this.Rr();
                if (!i || i.sessionId !== t) {
                    var e = { sessionId: t, props: this.Tr(this._instance) };
                    this.Mr.register({ [Dt]: e });
                }
            }),
                (this._instance = t),
                (this.Cr = i),
                (this.Mr = e),
                (this.Tr = r || Po),
                this.Cr.onSessionId(this.Pr);
        }
        Rr() {
            return this.Mr.props[Dt];
        }
        getSetOnceProps() {
            var t,
                i = null == (t = this.Rr()) ? void 0 : t.props;
            return i
                ? "r" in i
                    ? Xn(i)
                    : {
                          $referring_domain: i.referringDomain,
                          $pathname: i.initialPathName,
                          utm_source: i.utm_source,
                          utm_campaign: i.utm_campaign,
                          utm_medium: i.utm_medium,
                          utm_content: i.utm_content,
                          utm_term: i.utm_term,
                      }
                : {};
        }
        getSessionProps() {
            var t = {};
            return (
                J(Z(this.getSetOnceProps()), (i, e) => {
                    "$current_url" === e && (e = "url"),
                        (t["$session_entry_" + w(e)] = i);
                }),
                t
            );
        }
    }
    var To = z("[SessionId]");
    class Mo {
        constructor(t, i, e) {
            var r;
            if (((this.Or = []), !t.persistence))
                throw new Error(
                    "SessionIdManager requires a PostHogPersistence instance"
                );
            if (t.config.__preview_experimental_cookieless_mode)
                throw new Error(
                    "SessionIdManager cannot be used with __preview_experimental_cookieless_mode"
                );
            (this.S = t.config),
                (this.Mr = t.persistence),
                (this.oi = void 0),
                (this.kt = void 0),
                (this._sessionStartTimestamp = null),
                (this._sessionActivityTimestamp = null),
                (this.Fr = i || Ni),
                (this.Ar = e || Ni);
            var s = this.S.persistence_name || this.S.token,
                n = this.S.session_idle_timeout_seconds || 1800;
            if (
                ((this._sessionTimeoutMs =
                    1e3 *
                    Xe(n, 60, 36e3, "session_idle_timeout_seconds", 1800)),
                t.register({
                    $configured_session_timeout_ms: this._sessionTimeoutMs,
                }),
                this.Dr(),
                (this.Lr = "ph_" + s + "_window_id"),
                (this.Nr = "ph_" + s + "_primary_window_exists"),
                this.jr())
            ) {
                var o = Xi.D(this.Lr),
                    a = Xi.D(this.Nr);
                o && !a ? (this.oi = o) : Xi.N(this.Lr), Xi.L(this.Nr, !0);
            }
            if (null != (r = this.S.bootstrap) && r.sessionID)
                try {
                    var l = ((t) => {
                        var i = t.replace(/-/g, "");
                        if (32 !== i.length)
                            throw new Error("Not a valid UUID");
                        if ("7" !== i[12]) throw new Error("Not a UUIDv7");
                        return parseInt(i.substring(0, 12), 16);
                    })(this.S.bootstrap.sessionID);
                    this.zr(
                        this.S.bootstrap.sessionID,
                        new Date().getTime(),
                        l
                    );
                } catch (t) {
                    To.error("Invalid sessionID in bootstrap", t);
                }
            this.Ur();
        }
        get sessionTimeoutMs() {
            return this._sessionTimeoutMs;
        }
        onSessionId(t) {
            return (
                R(this.Or) && (this.Or = []),
                this.Or.push(t),
                this.kt && t(this.kt, this.oi),
                () => {
                    this.Or = this.Or.filter((i) => i !== t);
                }
            );
        }
        jr() {
            return "memory" !== this.S.persistence && !this.Mr.xe && Xi.O();
        }
        Br(t) {
            t !== this.oi && ((this.oi = t), this.jr() && Xi.L(this.Lr, t));
        }
        qr() {
            return this.oi ? this.oi : this.jr() ? Xi.D(this.Lr) : null;
        }
        zr(t, i, e) {
            (t === this.kt &&
                i === this._sessionActivityTimestamp &&
                e === this._sessionStartTimestamp) ||
                ((this._sessionStartTimestamp = e),
                (this._sessionActivityTimestamp = i),
                (this.kt = t),
                this.Mr.register({ [$t]: [i, t, e] }));
        }
        Hr() {
            if (
                this.kt &&
                this._sessionActivityTimestamp &&
                this._sessionStartTimestamp
            )
                return [
                    this._sessionActivityTimestamp,
                    this.kt,
                    this._sessionStartTimestamp,
                ];
            var t = this.Mr.props[$t];
            return x(t) && 2 === t.length && t.push(t[0]), t || [0, null, 0];
        }
        resetSessionId() {
            this.zr(null, null, null);
        }
        Ur() {
            st(
                t,
                "beforeunload",
                () => {
                    this.jr() && Xi.N(this.Nr);
                },
                { capture: !1 }
            );
        }
        checkAndGetSessionAndWindowId(t, i) {
            if (
                (void 0 === t && (t = !1),
                void 0 === i && (i = null),
                this.S.__preview_experimental_cookieless_mode)
            )
                throw new Error(
                    "checkAndGetSessionAndWindowId should not be called in __preview_experimental_cookieless_mode"
                );
            var e = i || new Date().getTime(),
                [r, s, n] = this.Hr(),
                o = this.qr(),
                a = F(n) && n > 0 && Math.abs(e - n) > 864e5,
                l = !1,
                u = !s,
                h = !t && Math.abs(e - r) > this.sessionTimeoutMs;
            u || h || a
                ? ((s = this.Fr()),
                  (o = this.Ar()),
                  To.info("new session ID generated", {
                      sessionId: s,
                      windowId: o,
                      changeReason: {
                          noSessionId: u,
                          activityTimeout: h,
                          sessionPastMaximumLength: a,
                      },
                  }),
                  (n = e),
                  (l = !0))
                : o || ((o = this.Ar()), (l = !0));
            var d = 0 === r || !t || a ? e : r,
                v = 0 === n ? new Date().getTime() : n;
            return (
                this.Br(o),
                this.zr(s, d, v),
                t || this.Dr(),
                l &&
                    this.Or.forEach((t) =>
                        t(
                            s,
                            o,
                            l
                                ? {
                                      noSessionId: u,
                                      activityTimeout: h,
                                      sessionPastMaximumLength: a,
                                  }
                                : void 0
                        )
                    ),
                {
                    sessionId: s,
                    windowId: o,
                    sessionStartTimestamp: v,
                    changeReason: l
                        ? {
                              noSessionId: u,
                              activityTimeout: h,
                              sessionPastMaximumLength: a,
                          }
                        : void 0,
                    lastActivityTimestamp: r,
                }
            );
        }
        Dr() {
            clearTimeout(this.Wr),
                (this.Wr = setTimeout(() => {
                    this.resetSessionId();
                }, 1.1 * this.sessionTimeoutMs));
        }
    }
    var Co = ["$set_once", "$set"],
        Oo = z("[SiteApps]");
    class Fo {
        constructor(t) {
            (this._instance = t), (this.Gr = []), (this.apps = {});
        }
        get isEnabled() {
            return !!this._instance.config.opt_in_site_apps;
        }
        Jr(t, i) {
            if (i) {
                var e = this.globalsForEvent(i);
                this.Gr.push(e),
                    this.Gr.length > 1e3 && (this.Gr = this.Gr.slice(10));
            }
        }
        get siteAppLoaders() {
            var t;
            return null == (t = v._POSTHOG_REMOTE_CONFIG) ||
                null == (t = t[this._instance.config.token])
                ? void 0
                : t.siteApps;
        }
        init() {
            if (this.isEnabled) {
                var t = this._instance.Ne(this.Jr.bind(this));
                this.Vr = () => {
                    t(), (this.Gr = []), (this.Vr = void 0);
                };
            }
        }
        globalsForEvent(t) {
            var i, e, r, s, n, o, a;
            if (!t) throw new Error("Event payload is required");
            var l = {},
                u = this._instance.get_property("$groups") || [],
                h =
                    this._instance.get_property("$stored_group_properties") ||
                    {};
            for (var [d, v] of Object.entries(h))
                l[d] = { id: u[d], type: d, properties: v };
            var { $set_once: c, $set: f } = t;
            return {
                event: q({}, H(t, Co), {
                    properties: q(
                        {},
                        t.properties,
                        f
                            ? {
                                  $set: q(
                                      {},
                                      null !==
                                          (i =
                                              null == (e = t.properties)
                                                  ? void 0
                                                  : e.$set) && void 0 !== i
                                          ? i
                                          : {},
                                      f
                                  ),
                              }
                            : {},
                        c
                            ? {
                                  $set_once: q(
                                      {},
                                      null !==
                                          (r =
                                              null == (s = t.properties)
                                                  ? void 0
                                                  : s.$set_once) && void 0 !== r
                                          ? r
                                          : {},
                                      c
                                  ),
                              }
                            : {}
                    ),
                    elements_chain:
                        null !==
                            (n =
                                null == (o = t.properties)
                                    ? void 0
                                    : o.$elements_chain) && void 0 !== n
                            ? n
                            : "",
                    distinct_id:
                        null == (a = t.properties) ? void 0 : a.distinct_id,
                }),
                person: {
                    properties: this._instance.get_property(
                        "$stored_person_properties"
                    ),
                },
                groups: l,
            };
        }
        setupSiteApp(t) {
            var i = this.apps[t.id],
                e = () => {
                    var e;
                    (!i.errored &&
                        this.Gr.length &&
                        (Oo.info(
                            "Processing " +
                                this.Gr.length +
                                " events for site app with id " +
                                t.id
                        ),
                        this.Gr.forEach((t) =>
                            null == i.processEvent ? void 0 : i.processEvent(t)
                        ),
                        (i.processedBuffer = !0)),
                    Object.values(this.apps).every(
                        (t) => t.processedBuffer || t.errored
                    )) &&
                        (null == (e = this.Vr) || e.call(this));
                },
                r = !1,
                s = (s) => {
                    (i.errored = !s),
                        (i.loaded = !0),
                        Oo.info(
                            "Site app with id " +
                                t.id +
                                " " +
                                (s ? "loaded" : "errored")
                        ),
                        r && e();
                };
            try {
                var { processEvent: n } = t.init({
                    posthog: this._instance,
                    callback: (t) => {
                        s(t);
                    },
                });
                n && (i.processEvent = n), (r = !0);
            } catch (i) {
                Oo.error(
                    "Error while initializing PostHog app with config id " +
                        t.id,
                    i
                ),
                    s(!1);
            }
            if (r && i.loaded)
                try {
                    e();
                } catch (e) {
                    Oo.error(
                        "Error while processing buffered events PostHog app with config id " +
                            t.id,
                        e
                    ),
                        (i.errored = !0);
                }
        }
        Kr() {
            var t = this.siteAppLoaders || [];
            for (var i of t)
                this.apps[i.id] = {
                    id: i.id,
                    loaded: !1,
                    errored: !1,
                    processedBuffer: !1,
                };
            for (var e of t) this.setupSiteApp(e);
        }
        Yr(t) {
            if (0 !== Object.keys(this.apps).length) {
                var i = this.globalsForEvent(t);
                for (var e of Object.values(this.apps))
                    try {
                        null == e.processEvent || e.processEvent(i);
                    } catch (i) {
                        Oo.error(
                            "Error while processing event " +
                                t.event +
                                " for site app " +
                                e.id,
                            i
                        );
                    }
            }
        }
        onRemoteConfig(t) {
            var i,
                e,
                r,
                s = this;
            if (null != (i = this.siteAppLoaders) && i.length)
                return this.isEnabled
                    ? (this.Kr(),
                      void this._instance.on("eventCaptured", (t) =>
                          this.Yr(t)
                      ))
                    : void Oo.error(
                          'PostHog site apps are disabled. Enable the "opt_in_site_apps" config to proceed.'
                      );
            if (
                (null == (e = this.Vr) || e.call(this),
                null != (r = t.siteApps) && r.length)
            )
                if (this.isEnabled) {
                    var n = function (t) {
                        var i;
                        (v["__$$ph_site_app_" + t] = s._instance),
                            null == (i = v.__PosthogExtensions__) ||
                                null == i.loadSiteApp ||
                                i.loadSiteApp(s._instance, a, (i) => {
                                    if (i)
                                        return Oo.error(
                                            "Error while initializing PostHog app with config id " +
                                                t,
                                            i
                                        );
                                });
                    };
                    for (var { id: o, url: a } of t.siteApps) n(o);
                } else
                    Oo.error(
                        'PostHog site apps are disabled. Enable the "opt_in_site_apps" config to proceed.'
                    );
        }
    }
    var Ao = [
            "amazonbot",
            "amazonproductbot",
            "app.hypefactors.com",
            "applebot",
            "archive.org_bot",
            "awariobot",
            "backlinksextendedbot",
            "baiduspider",
            "bingbot",
            "bingpreview",
            "chrome-lighthouse",
            "dataforseobot",
            "deepscan",
            "duckduckbot",
            "facebookexternal",
            "facebookcatalog",
            "http://yandex.com/bots",
            "hubspot",
            "ia_archiver",
            "linkedinbot",
            "meta-externalagent",
            "mj12bot",
            "msnbot",
            "nessus",
            "petalbot",
            "pinterest",
            "prerender",
            "rogerbot",
            "screaming frog",
            "sebot-wa",
            "sitebulb",
            "slackbot",
            "slurp",
            "trendictionbot",
            "turnitin",
            "twitterbot",
            "vercelbot",
            "yahoo! slurp",
            "yandexbot",
            "zoombot",
            "bot.htm",
            "bot.php",
            "(bot;",
            "bot/",
            "crawler",
            "ahrefsbot",
            "ahrefssiteaudit",
            "semrushbot",
            "siteauditbot",
            "splitsignalbot",
            "gptbot",
            "oai-searchbot",
            "chatgpt-user",
            "perplexitybot",
            "better uptime bot",
            "sentryuptimebot",
            "uptimerobot",
            "headlesschrome",
            "cypress",
            "google-hoteladsverifier",
            "adsbot-google",
            "apis-google",
            "duplexweb-google",
            "feedfetcher-google",
            "google favicon",
            "google web preview",
            "google-read-aloud",
            "googlebot",
            "googleother",
            "google-cloudvertexbot",
            "googleweblight",
            "mediapartners-google",
            "storebot-google",
            "google-inspectiontool",
            "bytespider",
        ],
        Do = function (t, i) {
            if (!t) return !1;
            var e = t.toLowerCase();
            return Ao.concat(i || []).some((t) => {
                var i = t.toLowerCase();
                return -1 !== e.indexOf(i);
            });
        },
        Lo = function (t, i) {
            if (!t) return !1;
            var e = t.userAgent;
            if (e && Do(e, i)) return !0;
            try {
                var r = null == t ? void 0 : t.userAgentData;
                if (
                    null != r &&
                    r.brands &&
                    r.brands.some((t) => Do(null == t ? void 0 : t.brand, i))
                )
                    return !0;
            } catch (t) {}
            return !!t.webdriver;
        },
        No = (function (t) {
            return (t.US = "us"), (t.EU = "eu"), (t.CUSTOM = "custom"), t;
        })({}),
        jo = "i.posthog.com";
    class zo {
        constructor(t) {
            (this.Xr = {}), (this.instance = t);
        }
        get apiHost() {
            var t = this.instance.config.api_host.trim().replace(/\/$/, "");
            return "https://app.posthog.com" === t
                ? "https://us.i.posthog.com"
                : t;
        }
        get uiHost() {
            var t,
                i =
                    null == (t = this.instance.config.ui_host)
                        ? void 0
                        : t.replace(/\/$/, "");
            return (
                i || (i = this.apiHost.replace("." + jo, ".posthog.com")),
                "https://app.posthog.com" === i ? "https://us.posthog.com" : i
            );
        }
        get region() {
            return (
                this.Xr[this.apiHost] ||
                    (/https:\/\/(app|us|us-assets)(\.i)?\.posthog\.com/i.test(
                        this.apiHost
                    )
                        ? (this.Xr[this.apiHost] = No.US)
                        : /https:\/\/(eu|eu-assets)(\.i)?\.posthog\.com/i.test(
                              this.apiHost
                          )
                        ? (this.Xr[this.apiHost] = No.EU)
                        : (this.Xr[this.apiHost] = No.CUSTOM)),
                this.Xr[this.apiHost]
            );
        }
        endpointFor(t, i) {
            if (
                (void 0 === i && (i = ""),
                i && (i = "/" === i[0] ? i : "/" + i),
                "ui" === t)
            )
                return this.uiHost + i;
            if (this.region === No.CUSTOM) return this.apiHost + i;
            var e = jo + i;
            switch (t) {
                case "assets":
                    return "https://" + this.region + "-assets." + e;
                case "api":
                    return "https://" + this.region + "." + e;
            }
        }
    }
    var Uo = {
        icontains: (i, e) =>
            !!t && e.href.toLowerCase().indexOf(i.toLowerCase()) > -1,
        not_icontains: (i, e) =>
            !!t && -1 === e.href.toLowerCase().indexOf(i.toLowerCase()),
        regex: (i, e) => !!t && Ns(e.href, i),
        not_regex: (i, e) => !!t && !Ns(e.href, i),
        exact: (t, i) => i.href === t,
        is_not: (t, i) => i.href !== t,
    };
    class Bo {
        constructor(t) {
            var i = this;
            (this.getWebExperimentsAndEvaluateDisplayLogic = function (t) {
                void 0 === t && (t = !1),
                    i.getWebExperiments((t) => {
                        Bo.Qr("retrieved web experiments from the server"),
                            (i.Zr = new Map()),
                            t.forEach((t) => {
                                if (t.feature_flag_key) {
                                    var e;
                                    if (i.Zr)
                                        Bo.Qr(
                                            "setting flag key ",
                                            t.feature_flag_key,
                                            " to web experiment ",
                                            t
                                        ),
                                            null == (e = i.Zr) ||
                                                e.set(t.feature_flag_key, t);
                                    var r = i._instance.getFeatureFlag(
                                        t.feature_flag_key
                                    );
                                    T(r) &&
                                        t.variants[r] &&
                                        i.ts(
                                            t.name,
                                            r,
                                            t.variants[r].transforms
                                        );
                                } else if (t.variants)
                                    for (var s in t.variants) {
                                        var n = t.variants[s];
                                        Bo.es(n) &&
                                            i.ts(t.name, s, n.transforms);
                                    }
                            });
                    }, t);
            }),
                (this._instance = t),
                this._instance.onFeatureFlags((t) => {
                    this.onFeatureFlags(t);
                });
        }
        onFeatureFlags(t) {
            if (this._is_bot())
                Bo.Qr(
                    "Refusing to render web experiment since the viewer is a likely bot"
                );
            else if (!this._instance.config.disable_web_experiments) {
                if (O(this.Zr))
                    return (
                        (this.Zr = new Map()),
                        this.loadIfEnabled(),
                        void this.previewWebExperiment()
                    );
                Bo.Qr("applying feature flags", t),
                    t.forEach((t) => {
                        var i;
                        if (this.Zr && null != (i = this.Zr) && i.has(t)) {
                            var e,
                                r = this._instance.getFeatureFlag(t),
                                s = null == (e = this.Zr) ? void 0 : e.get(t);
                            r &&
                                null != s &&
                                s.variants[r] &&
                                this.ts(s.name, r, s.variants[r].transforms);
                        }
                    });
            }
        }
        previewWebExperiment() {
            var t = Bo.getWindowLocation();
            if (null != t && t.search) {
                var i = $i(null == t ? void 0 : t.search, "__experiment_id"),
                    e = $i(
                        null == t ? void 0 : t.search,
                        "__experiment_variant"
                    );
                i &&
                    e &&
                    (Bo.Qr("previewing web experiments " + i + " && " + e),
                    this.getWebExperiments(
                        (t) => {
                            this.rs(parseInt(i), e, t);
                        },
                        !1,
                        !0
                    ));
            }
        }
        loadIfEnabled() {
            this._instance.config.disable_web_experiments ||
                this.getWebExperimentsAndEvaluateDisplayLogic();
        }
        getWebExperiments(t, i, e) {
            if (this._instance.config.disable_web_experiments && !e)
                return t([]);
            var r = this._instance.get_property("$web_experiments");
            if (r && !i) return t(r);
            this._instance.me({
                url: this._instance.requestRouter.endpointFor(
                    "api",
                    "/api/web_experiments/?token=" + this._instance.config.token
                ),
                method: "GET",
                callback: (i) => {
                    if (200 !== i.statusCode || !i.json) return t([]);
                    var e = i.json.experiments || [];
                    return t(e);
                },
            });
        }
        rs(t, i, e) {
            var r = e.filter((i) => i.id === t);
            r &&
                r.length > 0 &&
                (Bo.Qr(
                    "Previewing web experiment [" +
                        r[0].name +
                        "] with variant [" +
                        i +
                        "]"
                ),
                this.ts(r[0].name, i, r[0].variants[i].transforms));
        }
        static es(t) {
            return !O(t.conditions) && Bo.ss(t) && Bo.ns(t);
        }
        static ss(t) {
            var i;
            if (
                O(t.conditions) ||
                O(null == (i = t.conditions) ? void 0 : i.url)
            )
                return !0;
            var e,
                r,
                s,
                n = Bo.getWindowLocation();
            return (
                !!n &&
                (null == (e = t.conditions) ||
                    !e.url ||
                    Uo[
                        null !==
                            (r =
                                null == (s = t.conditions)
                                    ? void 0
                                    : s.urlMatchType) && void 0 !== r
                            ? r
                            : "icontains"
                    ](t.conditions.url, n))
            );
        }
        static getWindowLocation() {
            return null == t ? void 0 : t.location;
        }
        static ns(t) {
            var i;
            if (
                O(t.conditions) ||
                O(null == (i = t.conditions) ? void 0 : i.utm)
            )
                return !0;
            var e = Wn();
            if (e.utm_source) {
                var r,
                    s,
                    n,
                    o,
                    a,
                    l,
                    u,
                    h,
                    d =
                        null == (r = t.conditions) ||
                        null == (r = r.utm) ||
                        !r.utm_campaign ||
                        (null == (s = t.conditions) || null == (s = s.utm)
                            ? void 0
                            : s.utm_campaign) == e.utm_campaign,
                    v =
                        null == (n = t.conditions) ||
                        null == (n = n.utm) ||
                        !n.utm_source ||
                        (null == (o = t.conditions) || null == (o = o.utm)
                            ? void 0
                            : o.utm_source) == e.utm_source,
                    c =
                        null == (a = t.conditions) ||
                        null == (a = a.utm) ||
                        !a.utm_medium ||
                        (null == (l = t.conditions) || null == (l = l.utm)
                            ? void 0
                            : l.utm_medium) == e.utm_medium,
                    f =
                        null == (u = t.conditions) ||
                        null == (u = u.utm) ||
                        !u.utm_term ||
                        (null == (h = t.conditions) || null == (h = h.utm)
                            ? void 0
                            : h.utm_term) == e.utm_term;
                return d && c && f && v;
            }
            return !1;
        }
        static Qr(t) {
            for (
                var i = arguments.length,
                    e = new Array(i > 1 ? i - 1 : 0),
                    r = 1;
                r < i;
                r++
            )
                e[r - 1] = arguments[r];
            j.info("[WebExperiments] " + t, e);
        }
        ts(t, i, e) {
            this._is_bot()
                ? Bo.Qr(
                      "Refusing to render web experiment since the viewer is a likely bot"
                  )
                : "control" !== i
                ? e.forEach((e) => {
                      if (e.selector) {
                          var r;
                          Bo.Qr(
                              "applying transform of variant " +
                                  i +
                                  " for experiment " +
                                  t +
                                  " ",
                              e
                          );
                          var s =
                              null == (r = document)
                                  ? void 0
                                  : r.querySelectorAll(e.selector);
                          null == s ||
                              s.forEach((t) => {
                                  var i = t;
                                  e.html && (i.innerHTML = e.html),
                                      e.css && i.setAttribute("style", e.css);
                              });
                      }
                  })
                : Bo.Qr("Control variants leave the page unmodified.");
        }
        _is_bot() {
            return n && this._instance
                ? Lo(n, this._instance.config.custom_blocked_useragents)
                : void 0;
        }
    }
    var qo = {},
        Ho = () => {},
        Wo = "posthog",
        Go =
            !Cs &&
            -1 === (null == d ? void 0 : d.indexOf("MSIE")) &&
            -1 === (null == d ? void 0 : d.indexOf("Mozilla")),
        Jo = (i) => {
            var e;
            return {
                api_host: "https://us.i.posthog.com",
                ui_host: null,
                token: "",
                autocapture: !0,
                rageclick: !0,
                cross_subdomain_cookie: et(null == o ? void 0 : o.location),
                persistence: "localStorage+cookie",
                persistence_name: "",
                loaded: Ho,
                save_campaign_params: !0,
                custom_campaign_params: [],
                custom_blocked_useragents: [],
                save_referrer: !0,
                capture_pageview: "2025-05-24" !== i || "history_change",
                capture_pageleave: "if_capture_pageview",
                defaults: null != i ? i : "unset",
                debug:
                    (a &&
                        T(null == a ? void 0 : a.search) &&
                        -1 !== a.search.indexOf("__posthog_debug=true")) ||
                    !1,
                cookie_expiration: 365,
                upgrade: !1,
                disable_session_recording: !1,
                disable_persistence: !1,
                disable_web_experiments: !0,
                disable_surveys: !1,
                disable_external_dependency_loading: !1,
                enable_recording_console_log: void 0,
                secure_cookie:
                    "https:" ===
                    (null == t || null == (e = t.location)
                        ? void 0
                        : e.protocol),
                ip: !0,
                opt_out_capturing_by_default: !1,
                opt_out_persistence_by_default: !1,
                opt_out_useragent_filter: !1,
                opt_out_capturing_persistence_type: "localStorage",
                opt_out_capturing_cookie_prefix: null,
                opt_in_site_apps: !1,
                property_denylist: [],
                respect_dnt: !1,
                sanitize_properties: null,
                request_headers: {},
                request_batching: !0,
                properties_string_max_length: 65535,
                session_recording: {},
                mask_all_element_attributes: !1,
                mask_all_text: !1,
                mask_personal_data_properties: !1,
                custom_personal_data_properties: [],
                advanced_disable_decide: !1,
                advanced_disable_feature_flags: !1,
                advanced_disable_feature_flags_on_first_load: !1,
                advanced_disable_toolbar_metrics: !1,
                feature_flag_request_timeout_ms: 3e3,
                surveys_request_timeout_ms: 1e4,
                on_request_error: (t) => {
                    var i = "Bad HTTP status: " + t.statusCode + " " + t.text;
                    j.error(i);
                },
                get_device_id: (t) => t,
                capture_performance: void 0,
                name: "posthog",
                bootstrap: {},
                disable_compression: !1,
                session_idle_timeout_seconds: 1800,
                person_profiles: "identified_only",
                before_send: void 0,
                request_queue_config: { flush_interval_ms: $o },
                _onCapture: Ho,
            };
        },
        Vo = (t) => {
            var i = {};
            R(t.process_person) || (i.person_profiles = t.process_person),
                R(t.xhr_headers) || (i.request_headers = t.xhr_headers),
                R(t.cookie_name) || (i.persistence_name = t.cookie_name),
                R(t.disable_cookie) ||
                    (i.disable_persistence = t.disable_cookie),
                R(t.store_google) || (i.save_campaign_params = t.store_google),
                R(t.verbose) || (i.debug = t.verbose);
            var e = V({}, i, t);
            return (
                x(t.property_blacklist) &&
                    (R(t.property_denylist)
                        ? (e.property_denylist = t.property_blacklist)
                        : x(t.property_denylist)
                        ? (e.property_denylist = [
                              ...t.property_blacklist,
                              ...t.property_denylist,
                          ])
                        : j.error(
                              "Invalid value for property_denylist config: " +
                                  t.property_denylist
                          )),
                e
            );
        };
    class Ko {
        constructor() {
            this.__forceAllowLocalhost = !1;
        }
        get os() {
            return this.__forceAllowLocalhost;
        }
        set os(t) {
            j.error(
                "WebPerformanceObserver is deprecated and has no impact on network capture. Use `_forceAllowLocalhostNetworkCapture` on `posthog.sessionRecording`"
            ),
                (this.__forceAllowLocalhost = t);
        }
    }
    class Yo {
        get decideEndpointWasHit() {
            var t, i;
            return (
                null !==
                    (t =
                        null == (i = this.featureFlags)
                            ? void 0
                            : i.hasLoadedFlags) &&
                void 0 !== t &&
                t
            );
        }
        constructor() {
            (this.webPerformance = new Ko()),
                (this.ls = !1),
                (this.version = c.LIB_VERSION),
                (this.us = new fo()),
                (this._calculate_event_properties =
                    this.calculateEventProperties.bind(this)),
                (this.config = Jo()),
                (this.SentryIntegration = gs),
                (this.sentryIntegration = (t) =>
                    (function (t, i) {
                        var e = ps(t, i);
                        return { name: fs, processEvent: (t) => e(t) };
                    })(this, t)),
                (this.__request_queue = []),
                (this.__loaded = !1),
                (this.analyticsDefaultEndpoint = "/e/"),
                (this.hs = !1),
                (this.ds = null),
                (this.vs = null),
                (this.cs = null),
                (this.featureFlags = new ho(this)),
                (this.toolbar = new ys(this)),
                (this.scrollManager = new Io(this)),
                (this.pageViewManager = new Ts(this)),
                (this.surveys = new mo(this)),
                (this.experiments = new Bo(this)),
                (this.exceptions = new qs(this)),
                (this.rateLimiter = new wo(this)),
                (this.requestRouter = new zo(this)),
                (this.consent = new Zi(this)),
                (this.people = {
                    set: (t, i, e) => {
                        var r = T(t) ? { [t]: i } : t;
                        this.setPersonProperties(r), null == e || e({});
                    },
                    set_once: (t, i, e) => {
                        var r = T(t) ? { [t]: i } : t;
                        this.setPersonProperties(void 0, r), null == e || e({});
                    },
                }),
                this.on("eventCaptured", (t) =>
                    j.info('send "' + (null == t ? void 0 : t.event) + '"', t)
                );
        }
        init(t, i, e) {
            if (e && e !== Wo) {
                var r,
                    s = null !== (r = qo[e]) && void 0 !== r ? r : new Yo();
                return s._init(t, i, e), (qo[e] = s), (qo[Wo][e] = s), s;
            }
            return this._init(t, i, e);
        }
        _init(i, e, r) {
            var s, n;
            if ((void 0 === e && (e = {}), R(i) || M(i)))
                return (
                    j.critical(
                        "PostHog was initialized without a token. This likely indicates a misconfiguration. Please check the first argument passed to posthog.init()"
                    ),
                    this
                );
            if (this.__loaded)
                return (
                    j.warn(
                        "You have already initialized PostHog! Re-initializing is a no-op"
                    ),
                    this
                );
            (this.__loaded = !0),
                (this.config = {}),
                (this.fs = []),
                e.person_profiles && (this.vs = e.person_profiles),
                this.set_config(
                    V({}, Jo(e.defaults), Vo(e), { name: r, token: i })
                ),
                this.config.on_xhr_error &&
                    j.error(
                        "on_xhr_error is deprecated. Use on_request_error instead"
                    ),
                (this.compression = e.disable_compression ? void 0 : g.GZipJS),
                (this.persistence = new co(this.config)),
                (this.sessionPersistence =
                    "sessionStorage" === this.config.persistence ||
                    "memory" === this.config.persistence
                        ? this.persistence
                        : new co(
                              q({}, this.config, {
                                  persistence: "sessionStorage",
                              })
                          ));
            var o = q({}, this.persistence.props),
                a = q({}, this.sessionPersistence.props);
            if (
                ((this.ps = new ko(
                    (t) => this.gs(t),
                    this.config.request_queue_config
                )),
                (this._s = new Eo(this)),
                (this.__request_queue = []),
                this.config.__preview_experimental_cookieless_mode ||
                    ((this.sessionManager = new Mo(this)),
                    (this.sessionPropsManager = new Ro(
                        this,
                        this.sessionManager,
                        this.persistence
                    ))),
                new $s(this).startIfEnabledOrStop(),
                (this.siteApps = new Fo(this)),
                null == (s = this.siteApps) || s.init(),
                this.config.__preview_experimental_cookieless_mode ||
                    ((this.sessionRecording = new ds(this)),
                    this.sessionRecording.startIfEnabledOrStop()),
                this.config.disable_scroll_properties ||
                    this.scrollManager.startMeasuringScrollPosition(),
                (this.autocapture = new Mi(this)),
                this.autocapture.startIfEnabled(),
                this.surveys.loadIfEnabled(),
                (this.heatmaps = new Rs(this)),
                this.heatmaps.startIfEnabled(),
                (this.webVitalsAutocapture = new Es(this)),
                (this.exceptionObserver = new ne(this)),
                this.exceptionObserver.startIfEnabled(),
                (this.deadClicksAutocapture = new re(this, ee)),
                this.deadClicksAutocapture.startIfEnabled(),
                (this.historyAutocapture = new Le(this)),
                this.historyAutocapture.startIfEnabled(),
                (c.DEBUG = c.DEBUG || this.config.debug),
                c.DEBUG &&
                    j.info("Starting in debug mode", {
                        this: this,
                        config: e,
                        thisC: q({}, this.config),
                        p: o,
                        s: a,
                    }),
                this.bs(),
                void 0 !== (null == (n = e.bootstrap) ? void 0 : n.distinctID))
            ) {
                var l,
                    u,
                    h = this.config.get_device_id(Ni()),
                    d =
                        null != (l = e.bootstrap) && l.isIdentifiedID
                            ? h
                            : e.bootstrap.distinctID;
                this.persistence.set_property(
                    At,
                    null != (u = e.bootstrap) && u.isIdentifiedID
                        ? "identified"
                        : "anonymous"
                ),
                    this.register({
                        distinct_id: e.bootstrap.distinctID,
                        $device_id: d,
                    });
            }
            if (this.ws()) {
                var v,
                    f,
                    p = Object.keys(
                        (null == (v = e.bootstrap) ? void 0 : v.featureFlags) ||
                            {}
                    )
                        .filter((t) => {
                            var i;
                            return !(
                                null == (i = e.bootstrap) ||
                                null == (i = i.featureFlags) ||
                                !i[t]
                            );
                        })
                        .reduce((t, i) => {
                            var r;
                            return (
                                (t[i] =
                                    (null == (r = e.bootstrap) ||
                                    null == (r = r.featureFlags)
                                        ? void 0
                                        : r[i]) || !1),
                                t
                            );
                        }, {}),
                    _ = Object.keys(
                        (null == (f = e.bootstrap)
                            ? void 0
                            : f.featureFlagPayloads) || {}
                    )
                        .filter((t) => p[t])
                        .reduce((t, i) => {
                            var r, s;
                            null != (r = e.bootstrap) &&
                                null != (r = r.featureFlagPayloads) &&
                                r[i] &&
                                (t[i] =
                                    null == (s = e.bootstrap) ||
                                    null == (s = s.featureFlagPayloads)
                                        ? void 0
                                        : s[i]);
                            return t;
                        }, {});
                this.featureFlags.receivedFeatureFlags({
                    featureFlags: p,
                    featureFlagPayloads: _,
                });
            }
            if (this.config.__preview_experimental_cookieless_mode)
                this.register_once({ distinct_id: qt, $device_id: null }, "");
            else if (!this.get_distinct_id()) {
                var m = this.config.get_device_id(Ni());
                this.register_once({ distinct_id: m, $device_id: m }, ""),
                    this.persistence.set_property(At, "anonymous");
            }
            return (
                st(
                    t,
                    "onpagehide" in self ? "pagehide" : "unload",
                    this._handle_unload.bind(this),
                    { passive: !1 }
                ),
                this.toolbar.maybeLoadToolbar(),
                e.segment ? cs(this, () => this.ys()) : this.ys(),
                E(this.config._onCapture) &&
                    this.config._onCapture !== Ho &&
                    (j.warn(
                        "onCapture is deprecated. Please use `before_send` instead"
                    ),
                    this.on("eventCaptured", (t) =>
                        this.config._onCapture(t.event, t)
                    )),
                this
            );
        }
        be(t) {
            var i, e, r, s, n, a, l, u;
            if (!o || !o.body)
                return (
                    j.info(
                        "document not ready yet, trying again in 500 milliseconds..."
                    ),
                    void setTimeout(() => {
                        this.be(t);
                    }, 500)
                );
            (this.compression = void 0),
                t.supportedCompression &&
                    !this.config.disable_compression &&
                    (this.compression = m(t.supportedCompression, g.GZipJS)
                        ? g.GZipJS
                        : m(t.supportedCompression, g.Base64)
                        ? g.Base64
                        : void 0),
                null != (i = t.analytics) &&
                    i.endpoint &&
                    (this.analyticsDefaultEndpoint = t.analytics.endpoint),
                this.set_config({
                    person_profiles: this.vs ? this.vs : "identified_only",
                }),
                null == (e = this.siteApps) || e.onRemoteConfig(t),
                null == (r = this.sessionRecording) || r.onRemoteConfig(t),
                null == (s = this.autocapture) || s.onRemoteConfig(t),
                null == (n = this.heatmaps) || n.onRemoteConfig(t),
                this.surveys.onRemoteConfig(t),
                null == (a = this.webVitalsAutocapture) || a.onRemoteConfig(t),
                null == (l = this.exceptionObserver) || l.onRemoteConfig(t),
                this.exceptions.onRemoteConfig(t),
                null == (u = this.deadClicksAutocapture) || u.onRemoteConfig(t);
        }
        ys() {
            try {
                this.config.loaded(this);
            } catch (t) {
                j.critical("`loaded` function failed", t);
            }
            this.Ss(),
                this.config.capture_pageview &&
                    setTimeout(() => {
                        this.consent.isOptedIn() && this.$s();
                    }, 1),
                new So(this).load(),
                this.featureFlags.decide();
        }
        Ss() {
            var t;
            this.has_opted_out_capturing() ||
                (this.config.request_batching &&
                    (null == (t = this.ps) || t.enable()));
        }
        _dom_loaded() {
            this.has_opted_out_capturing() ||
                G(this.__request_queue, (t) => this.gs(t)),
                (this.__request_queue = []),
                this.Ss();
        }
        _handle_unload() {
            var t, i;
            this.config.request_batching
                ? (this.ks() && this.capture("$pageleave"),
                  null == (t = this.ps) || t.unload(),
                  null == (i = this._s) || i.unload())
                : this.ks() &&
                  this.capture("$pageleave", null, { transport: "sendBeacon" });
        }
        me(t) {
            this.__loaded &&
                (Go
                    ? this.__request_queue.push(t)
                    : this.rateLimiter.isServerRateLimited(t.batchKey) ||
                      ((t.transport = t.transport || this.config.api_transport),
                      (t.url = Fs(t.url, { ip: this.config.ip ? 1 : 0 })),
                      (t.headers = q({}, this.config.request_headers)),
                      (t.compression =
                          "best-available" === t.compression
                              ? this.compression
                              : t.compression),
                      (t.fetchOptions =
                          t.fetchOptions || this.config.fetch_options),
                      ((t) => {
                          var i,
                              e,
                              r,
                              s = q({}, t);
                          (s.timeout = s.timeout || 6e4),
                              (s.url = Fs(s.url, {
                                  _: new Date().getTime().toString(),
                                  ver: c.LIB_VERSION,
                                  compression: s.compression,
                              }));
                          var n =
                                  null !== (i = s.transport) && void 0 !== i
                                      ? i
                                      : "fetch",
                              o =
                                  null !==
                                      (e =
                                          null ==
                                          (r = rt(Ls, (t) => t.transport === n))
                                              ? void 0
                                              : r.method) && void 0 !== e
                                      ? e
                                      : Ls[0].method;
                          if (!o)
                              throw new Error("No available transport method");
                          o(s);
                      })(
                          q({}, t, {
                              callback: (i) => {
                                  var e, r;
                                  (this.rateLimiter.checkForLimiting(i),
                                  i.statusCode >= 400) &&
                                      (null ==
                                          (e = (r = this.config)
                                              .on_request_error) ||
                                          e.call(r, i));
                                  null == t.callback || t.callback(i);
                              },
                          })
                      )));
        }
        gs(t) {
            this._s ? this._s.retriableRequest(t) : this.me(t);
        }
        _execute_array(t) {
            var i,
                e = [],
                r = [],
                s = [];
            G(t, (t) => {
                t &&
                    ((i = t[0]),
                    x(i)
                        ? s.push(t)
                        : E(t)
                        ? t.call(this)
                        : x(t) && "alias" === i
                        ? e.push(t)
                        : x(t) && -1 !== i.indexOf("capture") && E(this[i])
                        ? s.push(t)
                        : r.push(t));
            });
            var n = function (t, i) {
                G(
                    t,
                    function (t) {
                        if (x(t[0])) {
                            var e = i;
                            J(t, function (t) {
                                e = e[t[0]].apply(e, t.slice(1));
                            });
                        } else this[t[0]].apply(this, t.slice(1));
                    },
                    i
                );
            };
            n(e, this), n(r, this), n(s, this);
        }
        ws() {
            var t, i;
            return (
                ((null == (t = this.config.bootstrap)
                    ? void 0
                    : t.featureFlags) &&
                    Object.keys(
                        null == (i = this.config.bootstrap)
                            ? void 0
                            : i.featureFlags
                    ).length > 0) ||
                !1
            );
        }
        push(t) {
            this._execute_array([t]);
        }
        capture(t, i, e) {
            var r;
            if (
                this.__loaded &&
                this.persistence &&
                this.sessionPersistence &&
                this.ps
            ) {
                if (!this.consent.isOptedOut())
                    if (!R(t) && T(t)) {
                        if (
                            this.config.opt_out_useragent_filter ||
                            !this._is_bot()
                        ) {
                            var s =
                                null != e && e.skip_client_rate_limiting
                                    ? void 0
                                    : this.rateLimiter.clientRateLimitContext();
                            if (null == s || !s.isRateLimited) {
                                null != i &&
                                    i.$current_url &&
                                    !T(null == i ? void 0 : i.$current_url) &&
                                    (j.error(
                                        "Invalid `$current_url` property provided to `posthog.capture`. Input must be a string. Ignoring provided value."
                                    ),
                                    null == i || delete i.$current_url),
                                    this.sessionPersistence.update_search_keyword(),
                                    this.config.save_campaign_params &&
                                        this.sessionPersistence.update_campaign_params(),
                                    this.config.save_referrer &&
                                        this.sessionPersistence.update_referrer_info(),
                                    (this.config.save_campaign_params ||
                                        this.config.save_referrer) &&
                                        this.persistence.set_initial_person_info();
                                var n = new Date(),
                                    o = (null == e ? void 0 : e.timestamp) || n,
                                    a = Ni(),
                                    l = {
                                        uuid: a,
                                        event: t,
                                        properties:
                                            this.calculateEventProperties(
                                                t,
                                                i || {},
                                                o,
                                                a
                                            ),
                                    };
                                s &&
                                    (l.properties.$lib_rate_limit_remaining_tokens =
                                        s.remainingTokens),
                                    (null == e ? void 0 : e.$set) &&
                                        (l.$set = null == e ? void 0 : e.$set);
                                var u = this.xs(
                                    null == e ? void 0 : e.$set_once
                                );
                                u && (l.$set_once = u),
                                    ((l = tt(
                                        l,
                                        null != e && e._noTruncate
                                            ? null
                                            : this.config
                                                  .properties_string_max_length
                                    )).timestamp = o),
                                    R(null == e ? void 0 : e.timestamp) ||
                                        ((l.properties.$event_time_override_provided =
                                            !0),
                                        (l.properties.$event_time_override_system_time =
                                            n));
                                var h = q({}, l.properties.$set, l.$set);
                                if (
                                    (P(h) ||
                                        this.setPersonPropertiesForFlags(h),
                                    !O(this.config.before_send))
                                ) {
                                    var d = this.Es(l);
                                    if (!d) return;
                                    l = d;
                                }
                                this.us.emit("eventCaptured", l);
                                var v = {
                                    method: "POST",
                                    url:
                                        null !==
                                            (r = null == e ? void 0 : e._url) &&
                                        void 0 !== r
                                            ? r
                                            : this.requestRouter.endpointFor(
                                                  "api",
                                                  this.analyticsDefaultEndpoint
                                              ),
                                    data: l,
                                    compression: "best-available",
                                    batchKey: null == e ? void 0 : e._batchKey,
                                };
                                return (
                                    !this.config.request_batching ||
                                    (e && (null == e || !e._batchKey)) ||
                                    (null != e && e.send_instantly)
                                        ? this.gs(v)
                                        : this.ps.enqueue(v),
                                    l
                                );
                            }
                            j.critical(
                                "This capture call is ignored due to client rate limiting."
                            );
                        }
                    } else j.error("No event name provided to posthog.capture");
            } else j.uninitializedWarning("posthog.capture");
        }
        Ne(t) {
            return this.on("eventCaptured", (i) => t(i.event, i));
        }
        calculateEventProperties(t, i, e, r, s) {
            if (
                ((e = e || new Date()),
                !this.persistence || !this.sessionPersistence)
            )
                return i;
            var n = s ? void 0 : this.persistence.remove_event_timer(t),
                a = q({}, i);
            if (
                ((a.token = this.config.token),
                (a.$config_defaults = this.config.defaults),
                this.config.__preview_experimental_cookieless_mode &&
                    (a.$cookieless_mode = !0),
                "$snapshot" === t)
            ) {
                var l = q(
                    {},
                    this.persistence.properties(),
                    this.sessionPersistence.properties()
                );
                return (
                    (a.distinct_id = l.distinct_id),
                    ((!T(a.distinct_id) && !F(a.distinct_id)) ||
                        M(a.distinct_id)) &&
                        j.error(
                            "Invalid distinct_id for replay event. This indicates a bug in your implementation"
                        ),
                    a
                );
            }
            var u,
                h = to(
                    this.config.mask_personal_data_properties,
                    this.config.custom_personal_data_properties
                );
            if (this.sessionManager) {
                var { sessionId: v, windowId: c } =
                    this.sessionManager.checkAndGetSessionAndWindowId(
                        s,
                        e.getTime()
                    );
                (a.$session_id = v), (a.$window_id = c);
            }
            this.sessionPropsManager &&
                V(a, this.sessionPropsManager.getSessionProps());
            try {
                var f;
                this.sessionRecording &&
                    V(a, this.sessionRecording.sdkDebugProperties),
                    (a.$sdk_debug_retry_queue_size =
                        null == (f = this._s) ? void 0 : f.length);
            } catch (t) {
                a.$sdk_debug_error_capturing_properties = String(t);
            }
            if (
                (this.requestRouter.region === No.CUSTOM &&
                    (a.$lib_custom_api_host = this.config.api_host),
                (u =
                    "$pageview" !== t || s
                        ? "$pageleave" !== t || s
                            ? this.pageViewManager.doEvent()
                            : this.pageViewManager.doPageLeave(e)
                        : this.pageViewManager.doPageView(e, r)),
                (a = V(a, u)),
                "$pageview" === t && o && (a.title = o.title),
                !R(n))
            ) {
                var p = e.getTime() - n;
                a.$duration = parseFloat((p / 1e3).toFixed(3));
            }
            d &&
                this.config.opt_out_useragent_filter &&
                (a.$browser_type = this._is_bot() ? "bot" : "browser"),
                ((a = V(
                    {},
                    h,
                    this.persistence.properties(),
                    this.sessionPersistence.properties(),
                    a
                )).$is_identified = this._isIdentified()),
                x(this.config.property_denylist)
                    ? J(this.config.property_denylist, function (t) {
                          delete a[t];
                      })
                    : j.error(
                          "Invalid value for property_denylist config: " +
                              this.config.property_denylist +
                              " or property_blacklist config: " +
                              this.config.property_blacklist
                      );
            var g = this.config.sanitize_properties;
            g &&
                (j.error(
                    "sanitize_properties is deprecated. Use before_send instead"
                ),
                (a = g(a, t)));
            var _ = this.Is();
            return (
                (a.$process_person_profile = _),
                _ && !s && this.Ps("_calculate_event_properties"),
                a
            );
        }
        xs(t) {
            var i;
            if (!this.persistence || !this.Is()) return t;
            if (this.ls) return t;
            var e = this.persistence.get_initial_props(),
                r =
                    null == (i = this.sessionPropsManager)
                        ? void 0
                        : i.getSetOnceProps(),
                s = V({}, e, r || {}, t || {}),
                n = this.config.sanitize_properties;
            return (
                n &&
                    (j.error(
                        "sanitize_properties is deprecated. Use before_send instead"
                    ),
                    (s = n(s, "$set_once"))),
                (this.ls = !0),
                P(s) ? void 0 : s
            );
        }
        register(t, i) {
            var e;
            null == (e = this.persistence) || e.register(t, i);
        }
        register_once(t, i, e) {
            var r;
            null == (r = this.persistence) || r.register_once(t, i, e);
        }
        register_for_session(t) {
            var i;
            null == (i = this.sessionPersistence) || i.register(t);
        }
        unregister(t) {
            var i;
            null == (i = this.persistence) || i.unregister(t);
        }
        unregister_for_session(t) {
            var i;
            null == (i = this.sessionPersistence) || i.unregister(t);
        }
        Rs(t, i) {
            this.register({ [t]: i });
        }
        getFeatureFlag(t, i) {
            return this.featureFlags.getFeatureFlag(t, i);
        }
        getFeatureFlagPayload(t) {
            var i = this.featureFlags.getFeatureFlagPayload(t);
            try {
                return JSON.parse(i);
            } catch (t) {
                return i;
            }
        }
        isFeatureEnabled(t, i) {
            return this.featureFlags.isFeatureEnabled(t, i);
        }
        reloadFeatureFlags() {
            this.featureFlags.reloadFeatureFlags();
        }
        updateEarlyAccessFeatureEnrollment(t, i) {
            this.featureFlags.updateEarlyAccessFeatureEnrollment(t, i);
        }
        getEarlyAccessFeatures(t, i, e) {
            return (
                void 0 === i && (i = !1),
                this.featureFlags.getEarlyAccessFeatures(t, i, e)
            );
        }
        on(t, i) {
            return this.us.on(t, i);
        }
        onFeatureFlags(t) {
            return this.featureFlags.onFeatureFlags(t);
        }
        onSurveysLoaded(t) {
            return this.surveys.onSurveysLoaded(t);
        }
        onSessionId(t) {
            var i, e;
            return null !==
                (i =
                    null == (e = this.sessionManager)
                        ? void 0
                        : e.onSessionId(t)) && void 0 !== i
                ? i
                : () => {};
        }
        getSurveys(t, i) {
            void 0 === i && (i = !1), this.surveys.getSurveys(t, i);
        }
        getActiveMatchingSurveys(t, i) {
            void 0 === i && (i = !1),
                this.surveys.getActiveMatchingSurveys(t, i);
        }
        renderSurvey(t, i) {
            this.surveys.renderSurvey(t, i);
        }
        canRenderSurvey(t) {
            return this.surveys.canRenderSurvey(t);
        }
        canRenderSurveyAsync(t, i) {
            return (
                void 0 === i && (i = !1),
                this.surveys.canRenderSurveyAsync(t, i)
            );
        }
        identify(t, i, e) {
            if (!this.__loaded || !this.persistence)
                return j.uninitializedWarning("posthog.identify");
            if (
                (F(t) &&
                    ((t = t.toString()),
                    j.warn(
                        "The first argument to posthog.identify was a number, but it should be a string. It has been converted to a string."
                    )),
                t)
            ) {
                if (["distinct_id", "distinctid"].includes(t.toLowerCase()))
                    j.critical(
                        'The string "' +
                            t +
                            '" was set in posthog.identify which indicates an error. This ID should be unique to the user and not a hardcoded string.'
                    );
                else if (this.Ps("posthog.identify")) {
                    var r = this.get_distinct_id();
                    if (
                        (this.register({ $user_id: t }),
                        !this.get_property("$device_id"))
                    ) {
                        var s = r;
                        this.register_once(
                            { $had_persisted_distinct_id: !0, $device_id: s },
                            ""
                        );
                    }
                    t !== r &&
                        t !== this.get_property(ot) &&
                        (this.unregister(ot),
                        this.register({ distinct_id: t }));
                    var n =
                        "anonymous" ===
                        (this.persistence.get_property(At) || "anonymous");
                    t !== r && n
                        ? (this.persistence.set_property(At, "identified"),
                          this.setPersonPropertiesForFlags(
                              q({}, e || {}, i || {}),
                              !1
                          ),
                          this.capture(
                              "$identify",
                              { distinct_id: t, $anon_distinct_id: r },
                              { $set: i || {}, $set_once: e || {} }
                          ),
                          (this.cs = js(t, i, e)),
                          this.featureFlags.setAnonymousDistinctId(r))
                        : (i || e) && this.setPersonProperties(i, e),
                        t !== r &&
                            (this.reloadFeatureFlags(), this.unregister(Ft));
                }
            } else
                j.error("Unique user id has not been set in posthog.identify");
        }
        setPersonProperties(t, i) {
            if ((t || i) && this.Ps("posthog.setPersonProperties")) {
                var e = js(this.get_distinct_id(), t, i);
                this.cs !== e
                    ? (this.setPersonPropertiesForFlags(
                          q({}, i || {}, t || {})
                      ),
                      this.capture("$set", {
                          $set: t || {},
                          $set_once: i || {},
                      }),
                      (this.cs = e))
                    : j.info(
                          "A duplicate setPersonProperties call was made with the same properties. It has been ignored."
                      );
            }
        }
        group(t, i, e) {
            if (t && i) {
                if (this.Ps("posthog.group")) {
                    var r = this.getGroups();
                    r[t] !== i && this.resetGroupPropertiesForFlags(t),
                        this.register({ $groups: q({}, r, { [t]: i }) }),
                        e &&
                            (this.capture("$groupidentify", {
                                $group_type: t,
                                $group_key: i,
                                $group_set: e,
                            }),
                            this.setGroupPropertiesForFlags({ [t]: e })),
                        r[t] === i || e || this.reloadFeatureFlags();
                }
            } else j.error("posthog.group requires a group type and group key");
        }
        resetGroups() {
            this.register({ $groups: {} }),
                this.resetGroupPropertiesForFlags(),
                this.reloadFeatureFlags();
        }
        setPersonPropertiesForFlags(t, i) {
            void 0 === i && (i = !0),
                this.featureFlags.setPersonPropertiesForFlags(t, i);
        }
        resetPersonPropertiesForFlags() {
            this.featureFlags.resetPersonPropertiesForFlags();
        }
        setGroupPropertiesForFlags(t, i) {
            void 0 === i && (i = !0),
                this.Ps("posthog.setGroupPropertiesForFlags") &&
                    this.featureFlags.setGroupPropertiesForFlags(t, i);
        }
        resetGroupPropertiesForFlags(t) {
            this.featureFlags.resetGroupPropertiesForFlags(t);
        }
        reset(t) {
            var i, e, r, s;
            if ((j.info("reset"), !this.__loaded))
                return j.uninitializedWarning("posthog.reset");
            var n = this.get_property("$device_id");
            if (
                (this.consent.reset(),
                null == (i = this.persistence) || i.clear(),
                null == (e = this.sessionPersistence) || e.clear(),
                this.surveys.reset(),
                null == (r = this.persistence) ||
                    r.set_property(At, "anonymous"),
                null == (s = this.sessionManager) || s.resetSessionId(),
                (this.cs = null),
                this.config.__preview_experimental_cookieless_mode)
            )
                this.register_once({ distinct_id: qt, $device_id: null }, "");
            else {
                var o = this.config.get_device_id(Ni());
                this.register_once(
                    { distinct_id: o, $device_id: t ? o : n },
                    ""
                );
            }
            this.register({ $last_posthog_reset: new Date().toISOString() }, 1);
        }
        get_distinct_id() {
            return this.get_property("distinct_id");
        }
        getGroups() {
            return this.get_property("$groups") || {};
        }
        get_session_id() {
            var t, i;
            return null !==
                (t =
                    null == (i = this.sessionManager)
                        ? void 0
                        : i.checkAndGetSessionAndWindowId(!0).sessionId) &&
                void 0 !== t
                ? t
                : "";
        }
        get_session_replay_url(t) {
            if (!this.sessionManager) return "";
            var { sessionId: i, sessionStartTimestamp: e } =
                    this.sessionManager.checkAndGetSessionAndWindowId(!0),
                r = this.requestRouter.endpointFor(
                    "ui",
                    "/project/" + this.config.token + "/replay/" + i
                );
            if (null != t && t.withTimestamp && e) {
                var s,
                    n =
                        null !== (s = t.timestampLookBack) && void 0 !== s
                            ? s
                            : 10;
                if (!e) return r;
                r +=
                    "?t=" +
                    Math.max(
                        Math.floor((new Date().getTime() - e) / 1e3) - n,
                        0
                    );
            }
            return r;
        }
        alias(t, i) {
            return t === this.get_property(nt)
                ? (j.critical(
                      "Attempting to create alias for existing People user - aborting."
                  ),
                  -2)
                : this.Ps("posthog.alias")
                ? (R(i) && (i = this.get_distinct_id()),
                  t !== i
                      ? (this.Rs(ot, t),
                        this.capture("$create_alias", {
                            alias: t,
                            distinct_id: i,
                        }))
                      : (j.warn(
                            "alias matches current distinct_id - skipping api call."
                        ),
                        this.identify(t),
                        -1))
                : void 0;
        }
        set_config(t) {
            var i,
                e,
                r,
                s,
                n = q({}, this.config);
            I(t) &&
                (V(this.config, Vo(t)),
                null == (i = this.persistence) ||
                    i.update_config(this.config, n),
                (this.sessionPersistence =
                    "sessionStorage" === this.config.persistence ||
                    "memory" === this.config.persistence
                        ? this.persistence
                        : new co(
                              q({}, this.config, {
                                  persistence: "sessionStorage",
                              })
                          )),
                Wi.O() &&
                    "true" === Wi.A("ph_debug") &&
                    (this.config.debug = !0),
                this.config.debug &&
                    ((c.DEBUG = !0),
                    j.info(
                        "set_config",
                        JSON.stringify(
                            {
                                config: t,
                                oldConfig: n,
                                newConfig: q({}, this.config),
                            },
                            null,
                            2
                        )
                    )),
                null == (e = this.sessionRecording) || e.startIfEnabledOrStop(),
                null == (r = this.autocapture) || r.startIfEnabled(),
                null == (s = this.heatmaps) || s.startIfEnabled(),
                this.surveys.loadIfEnabled(),
                this.bs());
        }
        startSessionRecording(t) {
            var i = !0 === t,
                e = {
                    sampling: i || !(null == t || !t.sampling),
                    linked_flag: i || !(null == t || !t.linked_flag),
                    url_trigger: i || !(null == t || !t.url_trigger),
                    event_trigger: i || !(null == t || !t.event_trigger),
                };
            if (Object.values(e).some(Boolean)) {
                var r, s, n, o, a;
                if (
                    (null == (r = this.sessionManager) ||
                        r.checkAndGetSessionAndWindowId(),
                    e.sampling)
                )
                    null == (s = this.sessionRecording) || s.overrideSampling();
                if (e.linked_flag)
                    null == (n = this.sessionRecording) ||
                        n.overrideLinkedFlag();
                if (e.url_trigger)
                    null == (o = this.sessionRecording) ||
                        o.overrideTrigger("url");
                if (e.event_trigger)
                    null == (a = this.sessionRecording) ||
                        a.overrideTrigger("event");
            }
            this.set_config({ disable_session_recording: !1 });
        }
        stopSessionRecording() {
            this.set_config({ disable_session_recording: !0 });
        }
        sessionRecordingStarted() {
            var t;
            return !(null == (t = this.sessionRecording) || !t.started);
        }
        captureException(t, i) {
            var e = new Error("PostHog syntheticException");
            this.exceptions.sendExceptionEvent(
                q(
                    {},
                    Ae(
                        ((t) => t instanceof Error)(t)
                            ? { error: t, event: t.message }
                            : { event: t },
                        { syntheticException: e }
                    ),
                    i
                )
            );
        }
        loadToolbar(t) {
            return this.toolbar.loadToolbar(t);
        }
        get_property(t) {
            var i;
            return null == (i = this.persistence) ? void 0 : i.props[t];
        }
        getSessionProperty(t) {
            var i;
            return null == (i = this.sessionPersistence) ? void 0 : i.props[t];
        }
        toString() {
            var t,
                i = null !== (t = this.config.name) && void 0 !== t ? t : Wo;
            return i !== Wo && (i = Wo + "." + i), i;
        }
        _isIdentified() {
            var t, i;
            return (
                "identified" ===
                    (null == (t = this.persistence)
                        ? void 0
                        : t.get_property(At)) ||
                "identified" ===
                    (null == (i = this.sessionPersistence)
                        ? void 0
                        : i.get_property(At))
            );
        }
        Is() {
            var t, i;
            return !(
                "never" === this.config.person_profiles ||
                ("identified_only" === this.config.person_profiles &&
                    !this._isIdentified() &&
                    P(this.getGroups()) &&
                    (null == (t = this.persistence) ||
                        null == (t = t.props) ||
                        !t[ot]) &&
                    (null == (i = this.persistence) ||
                        null == (i = i.props) ||
                        !i[Ut]))
            );
        }
        ks() {
            return (
                !0 === this.config.capture_pageleave ||
                ("if_capture_pageview" === this.config.capture_pageleave &&
                    (!0 === this.config.capture_pageview ||
                        "history_change" === this.config.capture_pageview))
            );
        }
        createPersonProfile() {
            this.Is() ||
                (this.Ps("posthog.createPersonProfile") &&
                    this.setPersonProperties({}, {}));
        }
        Ps(t) {
            return "never" === this.config.person_profiles
                ? (j.error(
                      t +
                          ' was called, but process_person is set to "never". This call will be ignored.'
                  ),
                  !1)
                : (this.Rs(Ut, !0), !0);
        }
        bs() {
            var t,
                i,
                e,
                r,
                s = this.consent.isOptedOut(),
                n = this.config.opt_out_persistence_by_default,
                o = this.config.disable_persistence || (s && !!n);
            (null == (t = this.persistence) ? void 0 : t.xe) !== o &&
                (null == (e = this.persistence) || e.set_disabled(o));
            (null == (i = this.sessionPersistence) ? void 0 : i.xe) !== o &&
                (null == (r = this.sessionPersistence) || r.set_disabled(o));
        }
        opt_in_capturing(t) {
            var i;
            (this.consent.optInOut(!0),
            this.bs(),
            R(null == t ? void 0 : t.captureEventName) ||
                (null != t && t.captureEventName)) &&
                this.capture(
                    null !== (i = null == t ? void 0 : t.captureEventName) &&
                        void 0 !== i
                        ? i
                        : "$opt_in",
                    null == t ? void 0 : t.captureProperties,
                    { send_instantly: !0 }
                );
            this.config.capture_pageview && this.$s();
        }
        opt_out_capturing() {
            this.consent.optInOut(!1), this.bs();
        }
        has_opted_in_capturing() {
            return this.consent.isOptedIn();
        }
        has_opted_out_capturing() {
            return this.consent.isOptedOut();
        }
        clear_opt_in_out_capturing() {
            this.consent.reset(), this.bs();
        }
        _is_bot() {
            return n ? Lo(n, this.config.custom_blocked_useragents) : void 0;
        }
        $s() {
            o &&
                ("visible" === o.visibilityState
                    ? this.hs ||
                      ((this.hs = !0),
                      this.capture(
                          "$pageview",
                          { title: o.title },
                          { send_instantly: !0 }
                      ),
                      this.ds &&
                          (o.removeEventListener("visibilitychange", this.ds),
                          (this.ds = null)))
                    : this.ds ||
                      ((this.ds = this.$s.bind(this)),
                      st(o, "visibilitychange", this.ds)));
        }
        debug(i) {
            !1 === i
                ? (null == t || t.console.log("You've disabled debug mode."),
                  localStorage && localStorage.removeItem("ph_debug"),
                  this.set_config({ debug: !1 }))
                : (null == t ||
                      t.console.log(
                          "You're now in debug mode. All calls to PostHog will be logged in your console.\nYou can disable this with `posthog.debug(false)`."
                      ),
                  localStorage && localStorage.setItem("ph_debug", "true"),
                  this.set_config({ debug: !0 }));
        }
        Es(t) {
            if (O(this.config.before_send)) return t;
            var i = x(this.config.before_send)
                    ? this.config.before_send
                    : [this.config.before_send],
                e = t;
            for (var r of i) {
                if (((e = r(e)), O(e))) {
                    var s =
                        "Event '" +
                        t.event +
                        "' was rejected in beforeSend function";
                    return (
                        L(t.event)
                            ? j.warn(
                                  s + ". This can cause unexpected behavior."
                              )
                            : j.info(s),
                        null
                    );
                }
                (e.properties && !P(e.properties)) ||
                    j.warn(
                        "Event '" +
                            t.event +
                            "' has no properties after beforeSend function, this is likely an error."
                    );
            }
            return e;
        }
        getPageViewId() {
            var t;
            return null == (t = this.pageViewManager.ne)
                ? void 0
                : t.pageViewId;
        }
        captureTraceFeedback(t, i) {
            this.capture("$ai_feedback", {
                $ai_trace_id: String(t),
                $ai_feedback_text: i,
            });
        }
        captureTraceMetric(t, i, e) {
            this.capture("$ai_metric", {
                $ai_trace_id: String(t),
                $ai_metric_name: i,
                $ai_metric_value: String(e),
            });
        }
    }
    !(function (t, i) {
        for (var e = 0; e < i.length; e++)
            t.prototype[i[e]] = Q(t.prototype[i[e]]);
    })(Yo, ["identify"]);
    var Xo, Qo;
    (Xo = qo[Wo] = new Yo()),
        (Qo = v.posthog) &&
            J(Qo._i, function (t) {
                if (t && x(t)) {
                    var i = Xo.init(t[0], t[1], t[2]),
                        e = Qo[t[2]] || Qo;
                    i &&
                        (i._execute_array.call(i.people, e.people),
                        i._execute_array(e));
                }
            }),
        (v.posthog = Xo),
        (function () {
            function i() {
                i.done ||
                    ((i.done = !0),
                    (Go = !1),
                    J(qo, function (t) {
                        t._dom_loaded();
                    }));
            }
            null != o && o.addEventListener
                ? "complete" === o.readyState
                    ? i()
                    : st(o, "DOMContentLoaded", i, { capture: !1 })
                : t &&
                  j.error(
                      "Browser doesn't support `document.addEventListener` so PostHog couldn't be initialized"
                  );
        })();
})();
