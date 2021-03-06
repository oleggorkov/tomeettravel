! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.moment = t()
}(this, function() {
    "use strict";

    function e() {
        return On.apply(null, arguments)
    }

    function t(e) {
        On = e
    }

    function n() {
        return {
            empty: !1,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: !1,
            invalidMonth: null,
            invalidFormat: !1,
            userInvalidated: !1,
            iso: !1
        }
    }

    function a(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }

    function s(e) {
        return "[object Date]" === Object.prototype.toString.call(e) || e instanceof Date
    }

    function r(e, t) {
        var n, a = [];
        for (n = 0; n < e.length; ++n) a.push(t(e[n], n));
        return a
    }

    function i(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }

    function o(e, t) {
        for (var n in t) i(t, n) && (e[n] = t[n]);
        return i(t, "toString") && (e.toString = t.toString), i(t, "valueOf") && (e.valueOf = t.valueOf), e
    }

    function d(e, t, n, a) {
        return Me(e, t, n, a, !0).utc()
    }

    function l(e) {
        return null == e._isValid && (e._isValid = !isNaN(e._d.getTime()) && e._pf.overflow < 0 && !e._pf.empty && !e._pf.invalidMonth && !e._pf.nullInput && !e._pf.invalidFormat && !e._pf.userInvalidated, e._strict && (e._isValid = e._isValid && 0 === e._pf.charsLeftOver && 0 === e._pf.unusedTokens.length && void 0 === e._pf.bigHour)), e._isValid
    }

    function u(e) {
        var t = d(0 / 0);
        return null != e ? o(t._pf, e) : t._pf.userInvalidated = !0, t
    }

    function c(e, t) {
        var n, a, s;
        if ("undefined" != typeof t._isAMomentObject && (e._isAMomentObject = t._isAMomentObject), "undefined" != typeof t._i && (e._i = t._i), "undefined" != typeof t._f && (e._f = t._f), "undefined" != typeof t._l && (e._l = t._l), "undefined" != typeof t._strict && (e._strict = t._strict), "undefined" != typeof t._tzm && (e._tzm = t._tzm), "undefined" != typeof t._isUTC && (e._isUTC = t._isUTC), "undefined" != typeof t._offset && (e._offset = t._offset), "undefined" != typeof t._pf && (e._pf = t._pf), "undefined" != typeof t._locale && (e._locale = t._locale), xn.length > 0)
            for (n in xn) a = xn[n], s = t[a], "undefined" != typeof s && (e[a] = s);
        return e
    }

    function f(t) {
        c(this, t), this._d = new Date(+t._d), Cn === !1 && (Cn = !0, e.updateOffset(this), Cn = !1)
    }

    function h(e) {
        return e instanceof f || null != e && i(e, "_isAMomentObject")
    }

    function m(e) {
        var t = +e,
            n = 0;
        return 0 !== t && isFinite(t) && (n = t >= 0 ? Math.floor(t) : Math.ceil(t)), n
    }

    function p(e, t, n) {
        var a, s = Math.min(e.length, t.length),
            r = Math.abs(e.length - t.length),
            i = 0;
        for (a = 0; s > a; a++)(n && e[a] !== t[a] || !n && m(e[a]) !== m(t[a])) && i++;
        return i + r
    }

    function v() {}

    function y(e) {
        return e ? e.toLowerCase().replace("_", "-") : e
    }

    function g(e) {
        for (var t, n, a, s, r = 0; r < e.length;) {
            for (s = y(e[r]).split("-"), t = s.length, n = y(e[r + 1]), n = n ? n.split("-") : null; t > 0;) {
                if (a = _(s.slice(0, t).join("-"))) return a;
                if (n && n.length >= t && p(s, n, !0) >= t - 1) break;
                t--
            }
            r++
        }
        return null
    }

    function _(e) {
        var t = null;
        if (!Pn[e] && "undefined" != typeof module && module && module.exports) try {
            t = Sn._abbr, require("./locale/" + e), w(t)
        } catch (n) {}
        return Pn[e]
    }

    function w(e, t) {
        var n;
        return e && (n = "undefined" == typeof t ? k(e) : D(e, t), n && (Sn = n)), Sn._abbr
    }

    function D(e, t) {
        return null !== t ? (t.abbr = e, Pn[e] || (Pn[e] = new v), Pn[e].set(t), w(e), Pn[e]) : (delete Pn[e], null)
    }

    function k(e) {
        var t;
        if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e) return Sn;
        if (!a(e)) {
            if (t = _(e)) return t;
            e = [e]
        }
        return g(e)
    }

    function b(e, t) {
        var n = e.toLowerCase();
        zn[n] = zn[n + "s"] = zn[t] = e
    }

    function M(e) {
        return "string" == typeof e ? zn[e] || zn[e.toLowerCase()] : void 0
    }

    function Y(e) {
        var t, n, a = {};
        for (n in e) i(e, n) && (t = M(n), t && (a[t] = e[n]));
        return a
    }

    function T(t, n) {
        return function(a) {
            return null != a ? (S(this, t, a), e.updateOffset(this, n), this) : O(this, t)
        }
    }

    function O(e, t) {
        return e._d["get" + (e._isUTC ? "UTC" : "") + t]()
    }

    function S(e, t, n) {
        return e._d["set" + (e._isUTC ? "UTC" : "") + t](n)
    }

    function x(e, t) {
        var n;
        if ("object" == typeof e)
            for (n in e) this.set(n, e[n]);
        else if (e = M(e), "function" == typeof this[e]) return this[e](t);
        return this
    }

    function C(e, t, n) {
        for (var a = "" + Math.abs(e), s = e >= 0; a.length < t;) a = "0" + a;
        return (s ? n ? "+" : "" : "-") + a
    }

    function P(e, t, n, a) {
        var s = a;
        "string" == typeof a && (s = function() {
            return this[a]()
        }), e && (Fn[e] = s), t && (Fn[t[0]] = function() {
            return C(s.apply(this, arguments), t[1], t[2])
        }), n && (Fn[n] = function() {
            return this.localeData().ordinal(s.apply(this, arguments), e)
        })
    }

    function z(e) {
        return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "")
    }

    function W(e) {
        var t, n, a = e.match(Wn);
        for (t = 0, n = a.length; n > t; t++) a[t] = Fn[a[t]] ? Fn[a[t]] : z(a[t]);
        return function(s) {
            var r = "";
            for (t = 0; n > t; t++) r += a[t] instanceof Function ? a[t].call(s, e) : a[t];
            return r
        }
    }

    function I(e, t) {
        return e.isValid() ? (t = U(t, e.localeData()), Un[t] || (Un[t] = W(t)), Un[t](e)) : e.localeData().invalidDate()
    }

    function U(e, t) {
        function n(e) {
            return t.longDateFormat(e) || e
        }
        var a = 5;
        for (In.lastIndex = 0; a >= 0 && In.test(e);) e = e.replace(In, n), In.lastIndex = 0, a -= 1;
        return e
    }

    function F(e, t, n) {
        Qn[e] = "function" == typeof t ? t : function(e) {
            return e && n ? n : t
        }
    }

    function L(e, t) {
        return i(Qn, e) ? Qn[e](t._strict, t._locale) : new RegExp(G(e))
    }

    function G(e) {
        return e.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(e, t, n, a, s) {
            return t || n || a || s
        }).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    }

    function j(e, t) {
        var n, a = t;
        for ("string" == typeof e && (e = [e]), "number" == typeof t && (a = function(e, n) {
            n[t] = m(e)
        }), n = 0; n < e.length; n++) Kn[e[n]] = a
    }

    function H(e, t) {
        j(e, function(e, n, a, s) {
            a._w = a._w || {}, t(e, a._w, a, s)
        })
    }

    function A(e, t, n) {
        null != t && i(Kn, e) && Kn[e](t, n._a, n, e)
    }

    function V(e, t) {
        return new Date(Date.UTC(e, t + 1, 0)).getUTCDate()
    }

    function $(e) {
        return this._months[e.month()]
    }

    function R(e) {
        return this._monthsShort[e.month()]
    }

    function B(e, t, n) {
        var a, s, r;
        for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), a = 0; 12 > a; a++) {
            if (s = d([2e3, a]), n && !this._longMonthsParse[a] && (this._longMonthsParse[a] = new RegExp("^" + this.months(s, "").replace(".", "") + "$", "i"), this._shortMonthsParse[a] = new RegExp("^" + this.monthsShort(s, "").replace(".", "") + "$", "i")), n || this._monthsParse[a] || (r = "^" + this.months(s, "") + "|^" + this.monthsShort(s, ""), this._monthsParse[a] = new RegExp(r.replace(".", ""), "i")), n && "MMMM" === t && this._longMonthsParse[a].test(e)) return a;
            if (n && "MMM" === t && this._shortMonthsParse[a].test(e)) return a;
            if (!n && this._monthsParse[a].test(e)) return a
        }
    }

    function Z(e, t) {
        var n;
        return "string" == typeof t && (t = e.localeData().monthsParse(t), "number" != typeof t) ? e : (n = Math.min(e.date(), V(e.year(), t)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, n), e)
    }

    function E(t) {
        return null != t ? (Z(this, t), e.updateOffset(this, !0), this) : O(this, "Month")
    }

    function N() {
        return V(this.year(), this.month())
    }

    function q(e) {
        var t, n = e._a;
        return n && -2 === e._pf.overflow && (t = n[ea] < 0 || n[ea] > 11 ? ea : n[ta] < 1 || n[ta] > V(n[Xn], n[ea]) ? ta : n[na] < 0 || n[na] > 24 || 24 === n[na] && (0 !== n[aa] || 0 !== n[sa] || 0 !== n[ra]) ? na : n[aa] < 0 || n[aa] > 59 ? aa : n[sa] < 0 || n[sa] > 59 ? sa : n[ra] < 0 || n[ra] > 999 ? ra : -1, e._pf._overflowDayOfYear && (Xn > t || t > ta) && (t = ta), e._pf.overflow = t), e
    }

    function J(t) {
        e.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + t)
    }

    function Q(e, t) {
        var n = !0;
        return o(function() {
            return n && (J(e), n = !1), t.apply(this, arguments)
        }, t)
    }

    function K(e, t) {
        da[e] || (J(t), da[e] = !0)
    }

    function X(e) {
        var t, n, a = e._i,
            s = la.exec(a);
        if (s) {
            for (e._pf.iso = !0, t = 0, n = ua.length; n > t; t++)
                if (ua[t][1].exec(a)) {
                    e._f = ua[t][0] + (s[6] || " ");
                    break
                }
            for (t = 0, n = ca.length; n > t; t++)
                if (ca[t][1].exec(a)) {
                    e._f += ca[t][0];
                    break
                }
            a.match(Nn) && (e._f += "Z"), ge(e)
        } else e._isValid = !1
    }

    function ee(t) {
        var n = fa.exec(t._i);
        return null !== n ? void(t._d = new Date(+n[1])) : (X(t), void(t._isValid === !1 && (delete t._isValid, e.createFromInputFallback(t))))
    }

    function te(e, t, n, a, s, r, i) {
        var o = new Date(e, t, n, a, s, r, i);
        return 1970 > e && o.setFullYear(e), o
    }

    function ne(e) {
        var t = new Date(Date.UTC.apply(null, arguments));
        return 1970 > e && t.setUTCFullYear(e), t
    }

    function ae(e) {
        return se(e) ? 366 : 365
    }

    function se(e) {
        return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0
    }

    function re() {
        return se(this.year())
    }

    function ie(e, t, n) {
        var a, s = n - t,
            r = n - e.day();
        return r > s && (r -= 7), s - 7 > r && (r += 7), a = Ye(e).add(r, "d"), {
            week: Math.ceil(a.dayOfYear() / 7),
            year: a.year()
        }
    }

    function oe(e) {
        return ie(e, this._week.dow, this._week.doy).week
    }

    function de() {
        return this._week.dow
    }

    function le() {
        return this._week.doy
    }

    function ue(e) {
        var t = this.localeData().week(this);
        return null == e ? t : this.add(7 * (e - t), "d")
    }

    function ce(e) {
        var t = ie(this, 1, 4).week;
        return null == e ? t : this.add(7 * (e - t), "d")
    }

    function fe(e, t, n, a, s) {
        var r, i, o = ne(e, 0, 1).getUTCDay();
        return o = 0 === o ? 7 : o, n = null != n ? n : s, r = s - o + (o > a ? 7 : 0) - (s > o ? 7 : 0), i = 7 * (t - 1) + (n - s) + r + 1, {
            year: i > 0 ? e : e - 1,
            dayOfYear: i > 0 ? i : ae(e - 1) + i
        }
    }

    function he(e) {
        var t = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
        return null == e ? t : this.add(e - t, "d")
    }

    function me(e, t, n) {
        return null != e ? e : null != t ? t : n
    }

    function pe(e) {
        var t = new Date;
        return e._useUTC ? [t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()] : [t.getFullYear(), t.getMonth(), t.getDate()]
    }

    function ve(e) {
        var t, n, a, s, r = [];
        if (!e._d) {
            for (a = pe(e), e._w && null == e._a[ta] && null == e._a[ea] && ye(e), e._dayOfYear && (s = me(e._a[Xn], a[Xn]), e._dayOfYear > ae(s) && (e._pf._overflowDayOfYear = !0), n = ne(s, 0, e._dayOfYear), e._a[ea] = n.getUTCMonth(), e._a[ta] = n.getUTCDate()), t = 0; 3 > t && null == e._a[t]; ++t) e._a[t] = r[t] = a[t];
            for (; 7 > t; t++) e._a[t] = r[t] = null == e._a[t] ? 2 === t ? 1 : 0 : e._a[t];
            24 === e._a[na] && 0 === e._a[aa] && 0 === e._a[sa] && 0 === e._a[ra] && (e._nextDay = !0, e._a[na] = 0), e._d = (e._useUTC ? ne : te).apply(null, r), null != e._tzm && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[na] = 24)
        }
    }

    function ye(e) {
        var t, n, a, s, r, i, o;
        t = e._w, null != t.GG || null != t.W || null != t.E ? (r = 1, i = 4, n = me(t.GG, e._a[Xn], ie(Ye(), 1, 4).year), a = me(t.W, 1), s = me(t.E, 1)) : (r = e._locale._week.dow, i = e._locale._week.doy, n = me(t.gg, e._a[Xn], ie(Ye(), r, i).year), a = me(t.w, 1), null != t.d ? (s = t.d, r > s && ++a) : s = null != t.e ? t.e + r : r), o = fe(n, a, s, i, r), e._a[Xn] = o.year, e._dayOfYear = o.dayOfYear
    }

    function ge(t) {
        if (t._f === e.ISO_8601) return void X(t);
        t._a = [], t._pf.empty = !0;
        var n, a, s, r, i, o = "" + t._i,
            d = o.length,
            l = 0;
        for (s = U(t._f, t._locale).match(Wn) || [], n = 0; n < s.length; n++) r = s[n], a = (o.match(L(r, t)) || [])[0], a && (i = o.substr(0, o.indexOf(a)), i.length > 0 && t._pf.unusedInput.push(i), o = o.slice(o.indexOf(a) + a.length), l += a.length), Fn[r] ? (a ? t._pf.empty = !1 : t._pf.unusedTokens.push(r), A(r, a, t)) : t._strict && !a && t._pf.unusedTokens.push(r);
        t._pf.charsLeftOver = d - l, o.length > 0 && t._pf.unusedInput.push(o), t._pf.bigHour === !0 && t._a[na] <= 12 && (t._pf.bigHour = void 0), t._a[na] = _e(t._locale, t._a[na], t._meridiem), ve(t), q(t)
    }

    function _e(e, t, n) {
        var a;
        return null == n ? t : null != e.meridiemHour ? e.meridiemHour(t, n) : null != e.isPM ? (a = e.isPM(n), a && 12 > t && (t += 12), a || 12 !== t || (t = 0), t) : t
    }

    function we(e) {
        var t, a, s, r, i;
        if (0 === e._f.length) return e._pf.invalidFormat = !0, void(e._d = new Date(0 / 0));
        for (r = 0; r < e._f.length; r++) i = 0, t = c({}, e), null != e._useUTC && (t._useUTC = e._useUTC), t._pf = n(), t._f = e._f[r], ge(t), l(t) && (i += t._pf.charsLeftOver, i += 10 * t._pf.unusedTokens.length, t._pf.score = i, (null == s || s > i) && (s = i, a = t));
        o(e, a || t)
    }

    function De(e) {
        if (!e._d) {
            var t = Y(e._i);
            e._a = [t.year, t.month, t.day || t.date, t.hour, t.minute, t.second, t.millisecond], ve(e)
        }
    }

    function ke(e) {
        var t, n = e._i,
            s = e._f;
        return e._locale = e._locale || k(e._l), null === n || void 0 === s && "" === n ? u({
            nullInput: !0
        }) : ("string" == typeof n && (e._i = n = e._locale.preparse(n)), h(n) ? new f(q(n)) : (a(s) ? we(e) : s ? ge(e) : be(e), t = new f(q(e)), t._nextDay && (t.add(1, "d"), t._nextDay = void 0), t))
    }

    function be(t) {
        var n = t._i;
        void 0 === n ? t._d = new Date : s(n) ? t._d = new Date(+n) : "string" == typeof n ? ee(t) : a(n) ? (t._a = r(n.slice(0), function(e) {
            return parseInt(e, 10)
        }), ve(t)) : "object" == typeof n ? De(t) : "number" == typeof n ? t._d = new Date(n) : e.createFromInputFallback(t)
    }

    function Me(e, t, a, s, r) {
        var i = {};
        return "boolean" == typeof a && (s = a, a = void 0), i._isAMomentObject = !0, i._useUTC = i._isUTC = r, i._l = a, i._i = e, i._f = t, i._strict = s, i._pf = n(), ke(i)
    }

    function Ye(e, t, n, a) {
        return Me(e, t, n, a, !1)
    }

    function Te(e, t) {
        var n, s;
        if (1 === t.length && a(t[0]) && (t = t[0]), !t.length) return Ye();
        for (n = t[0], s = 1; s < t.length; ++s) t[s][e](n) && (n = t[s]);
        return n
    }

    function Oe() {
        var e = [].slice.call(arguments, 0);
        return Te("isBefore", e)
    }

    function Se() {
        var e = [].slice.call(arguments, 0);
        return Te("isAfter", e)
    }

    function xe(e) {
        var t = Y(e),
            n = t.year || 0,
            a = t.quarter || 0,
            s = t.month || 0,
            r = t.week || 0,
            i = t.day || 0,
            o = t.hour || 0,
            d = t.minute || 0,
            l = t.second || 0,
            u = t.millisecond || 0;
        this._milliseconds = +u + 1e3 * l + 6e4 * d + 36e5 * o, this._days = +i + 7 * r, this._months = +s + 3 * a + 12 * n, this._data = {}, this._locale = k(), this._bubble()
    }

    function Ce(e) {
        return e instanceof xe
    }

    function Pe(e, t) {
        P(e, 0, 0, function() {
            var e = this.utcOffset(),
                n = "+";
            return 0 > e && (e = -e, n = "-"), n + C(~~(e / 60), 2) + t + C(~~e % 60, 2)
        })
    }

    function ze(e) {
        var t = (e || "").match(Nn) || [],
            n = t[t.length - 1] || [],
            a = (n + "").match(ya) || ["-", 0, 0],
            s = +(60 * a[1]) + m(a[2]);
        return "+" === a[0] ? s : -s
    }

    function We(t, n) {
        var a, r;
        return n._isUTC ? (a = n.clone(), r = (h(t) || s(t) ? +t : +Ye(t)) - +a, a._d.setTime(+a._d + r), e.updateOffset(a, !1), a) : Ye(t).local()
    }

    function Ie(e) {
        return 15 * -Math.round(e._d.getTimezoneOffset() / 15)
    }

    function Ue(t, n) {
        var a, s = this._offset || 0;
        return null != t ? ("string" == typeof t && (t = ze(t)), Math.abs(t) < 16 && (t = 60 * t), !this._isUTC && n && (a = Ie(this)), this._offset = t, this._isUTC = !0, null != a && this.add(a, "m"), s !== t && (!n || this._changeInProgress ? Qe(this, Ze(t - s, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, e.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? s : Ie(this)
    }

    function Fe(e, t) {
        return null != e ? ("string" != typeof e && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset()
    }

    function Le(e) {
        return this.utcOffset(0, e)
    }

    function Ge(e) {
        return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(Ie(this), "m")), this
    }

    function je() {
        return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(ze(this._i)), this
    }

    function He(e) {
        return e = e ? Ye(e).utcOffset() : 0, (this.utcOffset() - e) % 60 === 0
    }

    function Ae() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
    }

    function Ve() {
        if (this._a) {
            var e = this._isUTC ? d(this._a) : Ye(this._a);
            return this.isValid() && p(this._a, e.toArray()) > 0
        }
        return !1
    }

    function $e() {
        return !this._isUTC
    }

    function Re() {
        return this._isUTC
    }

    function Be() {
        return this._isUTC && 0 === this._offset
    }

    function Ze(e, t) {
        var n, a, s, r = e,
            o = null;
        return Ce(e) ? r = {
            ms: e._milliseconds,
            d: e._days,
            M: e._months
        } : "number" == typeof e ? (r = {}, t ? r[t] = e : r.milliseconds = e) : (o = ga.exec(e)) ? (n = "-" === o[1] ? -1 : 1, r = {
            y: 0,
            d: m(o[ta]) * n,
            h: m(o[na]) * n,
            m: m(o[aa]) * n,
            s: m(o[sa]) * n,
            ms: m(o[ra]) * n
        }) : (o = _a.exec(e)) ? (n = "-" === o[1] ? -1 : 1, r = {
            y: Ee(o[2], n),
            M: Ee(o[3], n),
            d: Ee(o[4], n),
            h: Ee(o[5], n),
            m: Ee(o[6], n),
            s: Ee(o[7], n),
            w: Ee(o[8], n)
        }) : null == r ? r = {} : "object" == typeof r && ("from" in r || "to" in r) && (s = qe(Ye(r.from), Ye(r.to)), r = {}, r.ms = s.milliseconds, r.M = s.months), a = new xe(r), Ce(e) && i(e, "_locale") && (a._locale = e._locale), a
    }

    function Ee(e, t) {
        var n = e && parseFloat(e.replace(",", "."));
        return (isNaN(n) ? 0 : n) * t
    }

    function Ne(e, t) {
        var n = {
            milliseconds: 0,
            months: 0
        };
        return n.months = t.month() - e.month() + 12 * (t.year() - e.year()), e.clone().add(n.months, "M").isAfter(t) && --n.months, n.milliseconds = +t - +e.clone().add(n.months, "M"), n
    }

    function qe(e, t) {
        var n;
        return t = We(t, e), e.isBefore(t) ? n = Ne(e, t) : (n = Ne(t, e), n.milliseconds = -n.milliseconds, n.months = -n.months), n
    }

    function Je(e, t) {
        return function(n, a) {
            var s, r;
            return null === a || isNaN(+a) || (K(t, "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period)."), r = n, n = a, a = r), n = "string" == typeof n ? +n : n, s = Ze(n, a), Qe(this, s, e), this
        }
    }

    function Qe(t, n, a, s) {
        var r = n._milliseconds,
            i = n._days,
            o = n._months;
        s = null == s ? !0 : s, r && t._d.setTime(+t._d + r * a), i && S(t, "Date", O(t, "Date") + i * a), o && Z(t, O(t, "Month") + o * a), s && e.updateOffset(t, i || o)
    }

    function Ke(e) {
        var t = e || Ye(),
            n = We(t, this).startOf("day"),
            a = this.diff(n, "days", !0),
            s = -6 > a ? "sameElse" : -1 > a ? "lastWeek" : 0 > a ? "lastDay" : 1 > a ? "sameDay" : 2 > a ? "nextDay" : 7 > a ? "nextWeek" : "sameElse";
        return this.format(this.localeData().calendar(s, this, Ye(t)))
    }

    function Xe() {
        return new f(this)
    }

    function et(e, t) {
        var n;
        return t = M("undefined" != typeof t ? t : "millisecond"), "millisecond" === t ? (e = h(e) ? e : Ye(e), +this > +e) : (n = h(e) ? +e : +Ye(e), n < +this.clone().startOf(t))
    }

    function tt(e, t) {
        var n;
        return t = M("undefined" != typeof t ? t : "millisecond"), "millisecond" === t ? (e = h(e) ? e : Ye(e), +e > +this) : (n = h(e) ? +e : +Ye(e), +this.clone().endOf(t) < n)
    }

    function nt(e, t, n) {
        return this.isAfter(e, n) && this.isBefore(t, n)
    }

    function at(e, t) {
        var n;
        return t = M(t || "millisecond"), "millisecond" === t ? (e = h(e) ? e : Ye(e), +this === +e) : (n = +Ye(e), +this.clone().startOf(t) <= n && n <= +this.clone().endOf(t))
    }

    function st(e) {
        return 0 > e ? Math.ceil(e) : Math.floor(e)
    }

    function rt(e, t, n) {
        var a, s, r = We(e, this),
            i = 6e4 * (r.utcOffset() - this.utcOffset());
        return t = M(t), "year" === t || "month" === t || "quarter" === t ? (s = it(this, r), "quarter" === t ? s /= 3 : "year" === t && (s /= 12)) : (a = this - r, s = "second" === t ? a / 1e3 : "minute" === t ? a / 6e4 : "hour" === t ? a / 36e5 : "day" === t ? (a - i) / 864e5 : "week" === t ? (a - i) / 6048e5 : a), n ? s : st(s)
    }

    function it(e, t) {
        var n, a, s = 12 * (t.year() - e.year()) + (t.month() - e.month()),
            r = e.clone().add(s, "months");
        return 0 > t - r ? (n = e.clone().add(s - 1, "months"), a = (t - r) / (r - n)) : (n = e.clone().add(s + 1, "months"), a = (t - r) / (n - r)), -(s + a)
    }

    function ot() {
        return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
    }

    function dt() {
        var e = this.clone().utc();
        return 0 < e.year() && e.year() <= 9999 ? "function" == typeof Date.prototype.toISOString ? this.toDate().toISOString() : I(e, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : I(e, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
    }

    function lt(t) {
        var n = I(this, t || e.defaultFormat);
        return this.localeData().postformat(n)
    }

    function ut(e, t) {
        return Ze({
            to: this,
            from: e
        }).locale(this.locale()).humanize(!t)
    }

    function ct(e) {
        return this.from(Ye(), e)
    }

    function ft(e) {
        var t;
        return void 0 === e ? this._locale._abbr : (t = k(e), null != t && (this._locale = t), this)
    }

    function ht() {
        return this._locale
    }

    function mt(e) {
        switch (e = M(e)) {
            case "year":
                this.month(0);
            case "quarter":
            case "month":
                this.date(1);
            case "week":
            case "isoWeek":
            case "day":
                this.hours(0);
            case "hour":
                this.minutes(0);
            case "minute":
                this.seconds(0);
            case "second":
                this.milliseconds(0)
        }
        return "week" === e && this.weekday(0), "isoWeek" === e && this.isoWeekday(1), "quarter" === e && this.month(3 * Math.floor(this.month() / 3)), this
    }

    function pt(e) {
        return e = M(e), void 0 === e || "millisecond" === e ? this : this.startOf(e).add(1, "isoWeek" === e ? "week" : e).subtract(1, "ms")
    }

    function vt() {
        return +this._d - 6e4 * (this._offset || 0)
    }

    function yt() {
        return Math.floor(+this / 1e3)
    }

    function gt() {
        return this._offset ? new Date(+this) : this._d
    }

    function _t() {
        var e = this;
        return [e.year(), e.month(), e.date(), e.hour(), e.minute(), e.second(), e.millisecond()]
    }

    function wt() {
        return l(this)
    }

    function Dt() {
        return o({}, this._pf)
    }

    function kt() {
        return this._pf.overflow
    }

    function bt(e, t) {
        P(0, [e, e.length], 0, t)
    }

    function Mt(e, t, n) {
        return ie(Ye([e, 11, 31 + t - n]), t, n).week
    }

    function Yt(e) {
        var t = ie(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
        return null == e ? t : this.add(e - t, "y")
    }

    function Tt(e) {
        var t = ie(this, 1, 4).year;
        return null == e ? t : this.add(e - t, "y")
    }

    function Ot() {
        return Mt(this.year(), 1, 4)
    }

    function St() {
        var e = this.localeData()._week;
        return Mt(this.year(), e.dow, e.doy)
    }

    function xt(e) {
        return null == e ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (e - 1) + this.month() % 3)
    }

    function Ct(e, t) {
        if ("string" == typeof e)
            if (isNaN(e)) {
                if (e = t.weekdaysParse(e), "number" != typeof e) return null
            } else e = parseInt(e, 10);
        return e
    }

    function Pt(e) {
        return this._weekdays[e.day()]
    }

    function zt(e) {
        return this._weekdaysShort[e.day()]
    }

    function Wt(e) {
        return this._weekdaysMin[e.day()]
    }

    function It(e) {
        var t, n, a;
        for (this._weekdaysParse || (this._weekdaysParse = []), t = 0; 7 > t; t++)
            if (this._weekdaysParse[t] || (n = Ye([2e3, 1]).day(t), a = "^" + this.weekdays(n, "") + "|^" + this.weekdaysShort(n, "") + "|^" + this.weekdaysMin(n, ""), this._weekdaysParse[t] = new RegExp(a.replace(".", ""), "i")), this._weekdaysParse[t].test(e)) return t
    }

    function Ut(e) {
        var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        return null != e ? (e = Ct(e, this.localeData()), this.add(e - t, "d")) : t
    }

    function Ft(e) {
        var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return null == e ? t : this.add(e - t, "d")
    }

    function Lt(e) {
        return null == e ? this.day() || 7 : this.day(this.day() % 7 ? e : e - 7)
    }

    function Gt(e, t) {
        P(e, 0, 0, function() {
            return this.localeData().meridiem(this.hours(), this.minutes(), t)
        })
    }

    function jt(e, t) {
        return t._meridiemParse
    }

    function Ht(e) {
        return "p" === (e + "").toLowerCase().charAt(0)
    }

    function At(e, t, n) {
        return e > 11 ? n ? "pm" : "PM" : n ? "am" : "AM"
    }

    function Vt(e) {
        P(0, [e, 3], 0, "millisecond")
    }

    function $t() {
        return this._isUTC ? "UTC" : ""
    }

    function Rt() {
        return this._isUTC ? "Coordinated Universal Time" : ""
    }

    function Bt(e) {
        return Ye(1e3 * e)
    }

    function Zt() {
        return Ye.apply(null, arguments).parseZone()
    }

    function Et(e, t, n) {
        var a = this._calendar[e];
        return "function" == typeof a ? a.call(t, n) : a
    }

    function Nt(e) {
        var t = this._longDateFormat[e];
        return !t && this._longDateFormat[e.toUpperCase()] && (t = this._longDateFormat[e.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(e) {
            return e.slice(1)
        }), this._longDateFormat[e] = t), t
    }

    function qt() {
        return this._invalidDate
    }

    function Jt(e) {
        return this._ordinal.replace("%d", e)
    }

    function Qt(e) {
        return e
    }

    function Kt(e, t, n, a) {
        var s = this._relativeTime[n];
        return "function" == typeof s ? s(e, t, n, a) : s.replace(/%d/i, e)
    }

    function Xt(e, t) {
        var n = this._relativeTime[e > 0 ? "future" : "past"];
        return "function" == typeof n ? n(t) : n.replace(/%s/i, t)
    }

    function en(e) {
        var t, n;
        for (n in e) t = e[n], "function" == typeof t ? this[n] = t : this["_" + n] = t;
        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
    }

    function tn(e, t, n, a) {
        var s = k(),
            r = d().set(a, t);
        return s[n](r, e)
    }

    function nn(e, t, n, a, s) {
        if ("number" == typeof e && (t = e, e = void 0), e = e || "", null != t) return tn(e, t, n, s);
        var r, i = [];
        for (r = 0; a > r; r++) i[r] = tn(e, r, n, s);
        return i
    }

    function an(e, t) {
        return nn(e, t, "months", 12, "month")
    }

    function sn(e, t) {
        return nn(e, t, "monthsShort", 12, "month")
    }

    function rn(e, t) {
        return nn(e, t, "weekdays", 7, "day")
    }

    function on(e, t) {
        return nn(e, t, "weekdaysShort", 7, "day")
    }

    function dn(e, t) {
        return nn(e, t, "weekdaysMin", 7, "day")
    }

    function ln() {
        var e = this._data;
        return this._milliseconds = Aa(this._milliseconds), this._days = Aa(this._days), this._months = Aa(this._months), e.milliseconds = Aa(e.milliseconds), e.seconds = Aa(e.seconds), e.minutes = Aa(e.minutes), e.hours = Aa(e.hours), e.months = Aa(e.months), e.years = Aa(e.years), this
    }

    function un(e, t, n, a) {
        var s = Ze(t, n);
        return e._milliseconds += a * s._milliseconds, e._days += a * s._days, e._months += a * s._months, e._bubble()
    }

    function cn(e, t) {
        return un(this, e, t, 1)
    }

    function fn(e, t) {
        return un(this, e, t, -1)
    }

    function hn() {
        var e, t, n, a = this._milliseconds,
            s = this._days,
            r = this._months,
            i = this._data,
            o = 0;
        return i.milliseconds = a % 1e3, e = st(a / 1e3), i.seconds = e % 60, t = st(e / 60), i.minutes = t % 60, n = st(t / 60), i.hours = n % 24, s += st(n / 24), o = st(mn(s)), s -= st(pn(o)), r += st(s / 30), s %= 30, o += st(r / 12), r %= 12, i.days = s, i.months = r, i.years = o, this
    }

    function mn(e) {
        return 400 * e / 146097
    }

    function pn(e) {
        return 146097 * e / 400
    }

    function vn(e) {
        var t, n, a = this._milliseconds;
        if (e = M(e), "month" === e || "year" === e) return t = this._days + a / 864e5, n = this._months + 12 * mn(t), "month" === e ? n : n / 12;
        switch (t = this._days + Math.round(pn(this._months / 12)), e) {
            case "week":
                return t / 7 + a / 6048e5;
            case "day":
                return t + a / 864e5;
            case "hour":
                return 24 * t + a / 36e5;
            case "minute":
                return 24 * t * 60 + a / 6e4;
            case "second":
                return 24 * t * 60 * 60 + a / 1e3;
            case "millisecond":
                return Math.floor(24 * t * 60 * 60 * 1e3) + a;
            default:
                throw new Error("Unknown unit " + e)
        }
    }

    function yn() {
        return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * m(this._months / 12)
    }

    function gn(e) {
        return function() {
            return this.as(e)
        }
    }

    function _n(e) {
        return e = M(e), this[e + "s"]()
    }

    function wn(e) {
        return function() {
            return this._data[e]
        }
    }

    function Dn() {
        return st(this.days() / 7)
    }

    function kn(e, t, n, a, s) {
        return s.relativeTime(t || 1, !!n, e, a)
    }

    function bn(e, t, n) {
        var a = Ze(e).abs(),
            s = as(a.as("s")),
            r = as(a.as("m")),
            i = as(a.as("h")),
            o = as(a.as("d")),
            d = as(a.as("M")),
            l = as(a.as("y")),
            u = s < ss.s && ["s", s] || 1 === r && ["m"] || r < ss.m && ["mm", r] || 1 === i && ["h"] || i < ss.h && ["hh", i] || 1 === o && ["d"] || o < ss.d && ["dd", o] || 1 === d && ["M"] || d < ss.M && ["MM", d] || 1 === l && ["y"] || ["yy", l];
        return u[2] = t, u[3] = +e > 0, u[4] = n, kn.apply(null, u)
    }

    function Mn(e, t) {
        return void 0 === ss[e] ? !1 : void 0 === t ? ss[e] : (ss[e] = t, !0)
    }

    function Yn(e) {
        var t = this.localeData(),
            n = bn(this, !e, t);
        return e && (n = t.pastFuture(+this, n)), t.postformat(n)
    }

    function Tn() {
        var e = rs(this.years()),
            t = rs(this.months()),
            n = rs(this.days()),
            a = rs(this.hours()),
            s = rs(this.minutes()),
            r = rs(this.seconds() + this.milliseconds() / 1e3),
            i = this.asSeconds();
        return i ? (0 > i ? "-" : "") + "P" + (e ? e + "Y" : "") + (t ? t + "M" : "") + (n ? n + "D" : "") + (a || s || r ? "T" : "") + (a ? a + "H" : "") + (s ? s + "M" : "") + (r ? r + "S" : "") : "P0D"
    }
    var On, Sn, xn = e.momentProperties = [],
        Cn = !1,
        Pn = {},
        zn = {},
        Wn = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g,
        In = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
        Un = {},
        Fn = {},
        Ln = /\d/,
        Gn = /\d\d/,
        jn = /\d{3}/,
        Hn = /\d{4}/,
        An = /[+-]?\d{6}/,
        Vn = /\d\d?/,
        $n = /\d{1,3}/,
        Rn = /\d{1,4}/,
        Bn = /[+-]?\d{1,6}/,
        Zn = /\d+/,
        En = /[+-]?\d+/,
        Nn = /Z|[+-]\d\d:?\d\d/gi,
        qn = /[+-]?\d+(\.\d{1,3})?/,
        Jn = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
        Qn = {},
        Kn = {},
        Xn = 0,
        ea = 1,
        ta = 2,
        na = 3,
        aa = 4,
        sa = 5,
        ra = 6;
    P("M", ["MM", 2], "Mo", function() {
        return this.month() + 1
    }), P("MMM", 0, 0, function(e) {
        return this.localeData().monthsShort(this, e)
    }), P("MMMM", 0, 0, function(e) {
        return this.localeData().months(this, e)
    }), b("month", "M"), F("M", Vn), F("MM", Vn, Gn), F("MMM", Jn), F("MMMM", Jn), j(["M", "MM"], function(e, t) {
        t[ea] = m(e) - 1
    }), j(["MMM", "MMMM"], function(e, t, n, a) {
        var s = n._locale.monthsParse(e, a, n._strict);
        null != s ? t[ea] = s : n._pf.invalidMonth = e
    });
    var ia = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        oa = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        da = {};
    e.suppressDeprecationWarnings = !1;
    var la = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        ua = [
            ["YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/],
            ["YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/],
            ["GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/],
            ["GGGG-[W]WW", /\d{4}-W\d{2}/],
            ["YYYY-DDD", /\d{4}-\d{3}/]
        ],
        ca = [
            ["HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/],
            ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/],
            ["HH:mm", /(T| )\d\d:\d\d/],
            ["HH", /(T| )\d\d/]
        ],
        fa = /^\/?Date\((\-?\d+)/i;
    e.createFromInputFallback = Q("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function(e) {
        e._d = new Date(e._i + (e._useUTC ? " UTC" : ""))
    }), P(0, ["YY", 2], 0, function() {
        return this.year() % 100
    }), P(0, ["YYYY", 4], 0, "year"), P(0, ["YYYYY", 5], 0, "year"), P(0, ["YYYYYY", 6, !0], 0, "year"), b("year", "y"), F("Y", En), F("YY", Vn, Gn), F("YYYY", Rn, Hn), F("YYYYY", Bn, An), F("YYYYYY", Bn, An), j(["YYYY", "YYYYY", "YYYYYY"], Xn), j("YY", function(t, n) {
        n[Xn] = e.parseTwoDigitYear(t)
    }), e.parseTwoDigitYear = function(e) {
        return m(e) + (m(e) > 68 ? 1900 : 2e3)
    };
    var ha = T("FullYear", !1);
    P("w", ["ww", 2], "wo", "week"), P("W", ["WW", 2], "Wo", "isoWeek"), b("week", "w"), b("isoWeek", "W"), F("w", Vn), F("ww", Vn, Gn), F("W", Vn), F("WW", Vn, Gn), H(["w", "ww", "W", "WW"], function(e, t, n, a) {
        t[a.substr(0, 1)] = m(e)
    });
    var ma = {
        dow: 0,
        doy: 6
    };
    P("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), b("dayOfYear", "DDD"), F("DDD", $n), F("DDDD", jn), j(["DDD", "DDDD"], function(e, t, n) {
        n._dayOfYear = m(e)
    }), e.ISO_8601 = function() {};
    var pa = Q("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function() {
            var e = Ye.apply(null, arguments);
            return this > e ? this : e
        }),
        va = Q("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function() {
            var e = Ye.apply(null, arguments);
            return e > this ? this : e
        });
    Pe("Z", ":"), Pe("ZZ", ""), F("Z", Nn), F("ZZ", Nn), j(["Z", "ZZ"], function(e, t, n) {
        n._useUTC = !0, n._tzm = ze(e)
    });
    var ya = /([\+\-]|\d\d)/gi;
    e.updateOffset = function() {};
    var ga = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,
        _a = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;
    Ze.fn = xe.prototype;
    var wa = Je(1, "add"),
        Da = Je(-1, "subtract");
    e.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
    var ka = Q("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(e) {
        return void 0 === e ? this.localeData() : this.locale(e)
    });
    P(0, ["gg", 2], 0, function() {
        return this.weekYear() % 100
    }), P(0, ["GG", 2], 0, function() {
        return this.isoWeekYear() % 100
    }), bt("gggg", "weekYear"), bt("ggggg", "weekYear"), bt("GGGG", "isoWeekYear"), bt("GGGGG", "isoWeekYear"), b("weekYear", "gg"), b("isoWeekYear", "GG"), F("G", En), F("g", En), F("GG", Vn, Gn), F("gg", Vn, Gn), F("GGGG", Rn, Hn), F("gggg", Rn, Hn), F("GGGGG", Bn, An), F("ggggg", Bn, An), H(["gggg", "ggggg", "GGGG", "GGGGG"], function(e, t, n, a) {
        t[a.substr(0, 2)] = m(e)
    }), H(["gg", "GG"], function(t, n, a, s) {
        n[s] = e.parseTwoDigitYear(t)
    }), P("Q", 0, 0, "quarter"), b("quarter", "Q"), F("Q", Ln), j("Q", function(e, t) {
        t[ea] = 3 * (m(e) - 1)
    }), P("D", ["DD", 2], "Do", "date"), b("date", "D"), F("D", Vn), F("DD", Vn, Gn), F("Do", function(e, t) {
        return e ? t._ordinalParse : t._ordinalParseLenient
    }), j(["D", "DD"], ta), j("Do", function(e, t) {
        t[ta] = m(e.match(Vn)[0], 10)
    });
    var ba = T("Date", !0);
    P("d", 0, "do", "day"), P("dd", 0, 0, function(e) {
        return this.localeData().weekdaysMin(this, e)
    }), P("ddd", 0, 0, function(e) {
        return this.localeData().weekdaysShort(this, e)
    }), P("dddd", 0, 0, function(e) {
        return this.localeData().weekdays(this, e)
    }), P("e", 0, 0, "weekday"), P("E", 0, 0, "isoWeekday"), b("day", "d"), b("weekday", "e"), b("isoWeekday", "E"), F("d", Vn), F("e", Vn), F("E", Vn), F("dd", Jn), F("ddd", Jn), F("dddd", Jn), H(["dd", "ddd", "dddd"], function(e, t, n) {
        var a = n._locale.weekdaysParse(e);
        null != a ? t.d = a : n._pf.invalidWeekday = e
    }), H(["d", "e", "E"], function(e, t, n, a) {
        t[a] = m(e)
    });
    var Ma = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        Ya = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        Ta = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
    P("H", ["HH", 2], 0, "hour"), P("h", ["hh", 2], 0, function() {
        return this.hours() % 12 || 12
    }), Gt("a", !0), Gt("A", !1), b("hour", "h"), F("a", jt), F("A", jt), F("H", Vn), F("h", Vn), F("HH", Vn, Gn), F("hh", Vn, Gn), j(["H", "HH"], na), j(["a", "A"], function(e, t, n) {
        n._isPm = n._locale.isPM(e), n._meridiem = e
    }), j(["h", "hh"], function(e, t, n) {
        t[na] = m(e), n._pf.bigHour = !0
    });
    var Oa = /[ap]\.?m?\.?/i,
        Sa = T("Hours", !0);
    P("m", ["mm", 2], 0, "minute"), b("minute", "m"), F("m", Vn), F("mm", Vn, Gn), j(["m", "mm"], aa);
    var xa = T("Minutes", !1);
    P("s", ["ss", 2], 0, "second"), b("second", "s"), F("s", Vn), F("ss", Vn, Gn), j(["s", "ss"], sa);
    var Ca = T("Seconds", !1);
    P("S", 0, 0, function() {
        return ~~(this.millisecond() / 100)
    }), P(0, ["SS", 2], 0, function() {
        return ~~(this.millisecond() / 10)
    }), Vt("SSS"), Vt("SSSS"), b("millisecond", "ms"), F("S", $n, Ln), F("SS", $n, Gn), F("SSS", $n, jn), F("SSSS", Zn), j(["S", "SS", "SSS", "SSSS"], function(e, t) {
        t[ra] = m(1e3 * ("0." + e))
    });
    var Pa = T("Milliseconds", !1);
    P("z", 0, 0, "zoneAbbr"), P("zz", 0, 0, "zoneName");
    var za = f.prototype;
    za.add = wa, za.calendar = Ke, za.clone = Xe, za.diff = rt, za.endOf = pt, za.format = lt, za.from = ut, za.fromNow = ct, za.get = x, za.invalidAt = kt, za.isAfter = et, za.isBefore = tt, za.isBetween = nt, za.isSame = at, za.isValid = wt, za.lang = ka, za.locale = ft, za.localeData = ht, za.max = va, za.min = pa, za.parsingFlags = Dt, za.set = x, za.startOf = mt, za.subtract = Da, za.toArray = _t, za.toDate = gt, za.toISOString = dt, za.toJSON = dt, za.toString = ot, za.unix = yt, za.valueOf = vt, za.year = ha, za.isLeapYear = re, za.weekYear = Yt, za.isoWeekYear = Tt, za.quarter = za.quarters = xt, za.month = E, za.daysInMonth = N, za.week = za.weeks = ue, za.isoWeek = za.isoWeeks = ce, za.weeksInYear = St, za.isoWeeksInYear = Ot, za.date = ba, za.day = za.days = Ut, za.weekday = Ft, za.isoWeekday = Lt, za.dayOfYear = he, za.hour = za.hours = Sa, za.minute = za.minutes = xa, za.second = za.seconds = Ca, za.millisecond = za.milliseconds = Pa, za.utcOffset = Ue, za.utc = Le, za.local = Ge, za.parseZone = je, za.hasAlignedHourOffset = He, za.isDST = Ae, za.isDSTShifted = Ve, za.isLocal = $e, za.isUtcOffset = Re, za.isUtc = Be, za.isUTC = Be, za.zoneAbbr = $t, za.zoneName = Rt, za.dates = Q("dates accessor is deprecated. Use date instead.", ba), za.months = Q("months accessor is deprecated. Use month instead", E), za.years = Q("years accessor is deprecated. Use year instead", ha), za.zone = Q("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", Fe);
    var Wa = za,
        Ia = {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        },
        Ua = {
            LTS: "h:mm:ss A",
            LT: "h:mm A",
            L: "MM/DD/YYYY",
            LL: "MMMM D, YYYY",
            LLL: "MMMM D, YYYY LT",
            LLLL: "dddd, MMMM D, YYYY LT"
        },
        Fa = "Invalid date",
        La = "%d",
        Ga = /\d{1,2}/,
        ja = {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        Ha = v.prototype;
    Ha._calendar = Ia, Ha.calendar = Et, Ha._longDateFormat = Ua, Ha.longDateFormat = Nt, Ha._invalidDate = Fa, Ha.invalidDate = qt, Ha._ordinal = La, Ha.ordinal = Jt, Ha._ordinalParse = Ga, Ha.preparse = Qt, Ha.postformat = Qt, Ha._relativeTime = ja,
        Ha.relativeTime = Kt, Ha.pastFuture = Xt, Ha.set = en, Ha.months = $, Ha._months = ia, Ha.monthsShort = R, Ha._monthsShort = oa, Ha.monthsParse = B, Ha.week = oe, Ha._week = ma, Ha.firstDayOfYear = le, Ha.firstDayOfWeek = de, Ha.weekdays = Pt, Ha._weekdays = Ma, Ha.weekdaysMin = Wt, Ha._weekdaysMin = Ta, Ha.weekdaysShort = zt, Ha._weekdaysShort = Ya, Ha.weekdaysParse = It, Ha.isPM = Ht, Ha._meridiemParse = Oa, Ha.meridiem = At, w("en", {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function(e) {
            var t = e % 10,
                n = 1 === m(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th";
            return e + n
        }
    }), e.lang = Q("moment.lang is deprecated. Use moment.locale instead.", w), e.langData = Q("moment.langData is deprecated. Use moment.localeData instead.", k);
    var Aa = Math.abs,
        Va = gn("ms"),
        $a = gn("s"),
        Ra = gn("m"),
        Ba = gn("h"),
        Za = gn("d"),
        Ea = gn("w"),
        Na = gn("M"),
        qa = gn("y"),
        Ja = wn("milliseconds"),
        Qa = wn("seconds"),
        Ka = wn("minutes"),
        Xa = wn("hours"),
        es = wn("days"),
        ts = wn("months"),
        ns = wn("years"),
        as = Math.round,
        ss = {
            s: 45,
            m: 45,
            h: 22,
            d: 26,
            M: 11
        },
        rs = Math.abs,
        is = xe.prototype;
    is.abs = ln, is.add = cn, is.subtract = fn, is.as = vn, is.asMilliseconds = Va, is.asSeconds = $a, is.asMinutes = Ra, is.asHours = Ba, is.asDays = Za, is.asWeeks = Ea, is.asMonths = Na, is.asYears = qa, is.valueOf = yn, is._bubble = hn, is.get = _n, is.milliseconds = Ja, is.seconds = Qa, is.minutes = Ka, is.hours = Xa, is.days = es, is.weeks = Dn, is.months = ts, is.years = ns, is.humanize = Yn, is.toISOString = Tn, is.toString = Tn, is.toJSON = Tn, is.locale = ft, is.localeData = ht, is.toIsoString = Q("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Tn), is.lang = ka, P("X", 0, 0, "unix"), P("x", 0, 0, "valueOf"), F("x", En), F("X", qn), j("X", function(e, t, n) {
        n._d = new Date(1e3 * parseFloat(e, 10))
    }), j("x", function(e, t, n) {
        n._d = new Date(m(e))
    }), e.version = "2.10.2", t(Ye), e.fn = Wa, e.min = Oe, e.max = Se, e.utc = d, e.unix = Bt, e.months = an, e.isDate = s, e.locale = w, e.invalid = u, e.duration = Ze, e.isMoment = h, e.weekdays = rn, e.parseZone = Zt, e.localeData = k, e.isDuration = Ce, e.monthsShort = sn, e.weekdaysMin = dn, e.defineLocale = D, e.weekdaysShort = on, e.normalizeUnits = M, e.relativeTimeThreshold = Mn;
    var os = e;
    return os
}),
    function(e) {
        "function" == typeof define && define.amd ? define(["jquery", "moment"], e) : "object" == typeof exports && "undefined" != typeof module ? module.exports = e(require("jquery"), require("moment")) : e(jQuery, moment)
    }(function(e, t) {
        e.dateRangePickerLanguages = {
            az: {
                selected: "Seçildi:",
                day: " gün",
                days: " gün",
                apply: "tətbiq",
                "week-1": "1",
                "week-2": "2",
                "week-3": "3",
                "week-4": "4",
                "week-5": "5",
                "week-6": "6",
                "week-7": "7",
                "month-name": ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avqust", "sentyabr", "oktyabr", "noyabr", "dekabr"],
                shortcuts: "Qısayollar",
                past: "Keçmiş",
                following: "Növbəti",
                previous: "&nbsp;&nbsp;&nbsp;",
                "prev-week": "Öncəki həftə",
                "prev-month": "Öncəki ay",
                "prev-year": "Öncəki il",
                next: "&nbsp;&nbsp;&nbsp;",
                "next-week": "Növbəti həftə",
                "next-month": "Növbəti ay",
                "next-year": "Növbəti il",
                "less-than": "Tarix aralığı %d gündən çox olmamalıdır",
                "more-than": "Tarix aralığı %d gündən az olmamalıdır",
                "default-more": "%d gündən çox bir tarix seçin",
                "default-single": "Tarix seçin",
                "default-less": "%d gündən az bir tarix seçin",
                "default-range": "%d və %d gün aralığında tarixlər seçin",
                "default-default": "Tarix aralığı seçin"
            },
            cn: {
                selected: "已选择:",
                day: "天",
                days: "天",
                apply: "确定",
                "week-1": "一",
                "week-2": "二",
                "week-3": "三",
                "week-4": "四",
                "week-5": "五",
                "week-6": "六",
                "week-7": "日",
                "month-name": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                shortcuts: "快捷选择",
                past: "过去",
                following: "将来",
                previous: "&nbsp;&nbsp;&nbsp;",
                "prev-week": "上周",
                "prev-month": "上个月",
                "prev-year": "去年",
                next: "&nbsp;&nbsp;&nbsp;",
                "next-week": "下周",
                "next-month": "下个月",
                "next-year": "明年",
                "less-than": "所选日期范围不能大于%d天",
                "more-than": "所选日期范围不能小于%d天",
                "default-more": "请选择大于%d天的日期范围",
                "default-less": "请选择小于%d天的日期范围",
                "default-range": "请选择%d天到%d天的日期范围",
                "default-single": "请选择一个日期",
                "default-default": "请选择一个日期范围",
                time: "时间",
                hour: "小时",
                minute: "分钟"
            },
            cz: {
                selected: "Vybráno:",
                day: "Den",
                days: "Dny",
                apply: "Zavřít",
                "week-1": "po",
                "week-2": "út",
                "week-3": "st",
                "week-4": "čt",
                "week-5": "pá",
                "week-6": "so",
                "week-7": "ne",
                "month-name": ["leden", "únor", "březen", "duben", "květen", "červen", "červenec", "srpen", "září", "říjen", "listopad", "prosinec"],
                shortcuts: "Zkratky",
                past: "po",
                following: "následující",
                previous: "předchozí",
                "prev-week": "týden",
                "prev-month": "měsíc",
                "prev-year": "rok",
                next: "další",
                "next-week": "týden",
                "next-month": "měsíc",
                "next-year": "rok",
                "less-than": "Rozsah data by neměl být větší než %d dnů",
                "more-than": "Rozsah data by neměl být menší než %d dnů",
                "default-more": "Prosím zvolte rozsah data větší než %d dnů",
                "default-single": "Prosím zvolte datum",
                "default-less": "Prosím zvolte rozsah data menší než %d dnů",
                "default-range": "Prosím zvolte rozsah data mezi %d a %d dny",
                "default-default": "Prosím zvolte rozsah data"
            },
            en: {
                selected: "Selected:",
                day: "Day",
                days: "Days",
                apply: "Close",
                "week-1": "mo",
                "week-2": "tu",
                "week-3": "we",
                "week-4": "th",
                "week-5": "fr",
                "week-6": "sa",
                "week-7": "su",
                "month-name": ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"],
                shortcuts: "Shortcuts",
                "custom-values": "Custom Values",
                past: "Past",
                following: "Following",
                previous: "Previous",
                "prev-week": "Week",
                "prev-month": "Month",
                "prev-year": "Year",
                next: "Next",
                "next-week": "Week",
                "next-month": "Month",
                "next-year": "Year",
                "less-than": "Date range should not be more than %d days",
                "more-than": "Date range should not be less than %d days",
                "default-more": "Please select a date range longer than %d days",
                "default-single": "Please select a date",
                "default-less": "Please select a date range less than %d days",
                "default-range": "Please select a date range between %d and %d days",
                "default-default": "Please select a date range",
                time: "Time",
                hour: "Hour",
                minute: "Minute"
            },
            it: {
                selected: "Selezionati:",
                day: "Giorno",
                days: "Giorni",
                apply: "Chiudi",
                "week-1": "lu",
                "week-2": "ma",
                "week-3": "me",
                "week-4": "gi",
                "week-5": "ve",
                "week-6": "sa",
                "week-7": "do",
                "month-name": ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"],
                shortcuts: "Scorciatoie",
                past: "Scorso",
                following: "Successivo",
                previous: "Precedente",
                "prev-week": "Settimana",
                "prev-month": "Mese",
                "prev-year": "Anno",
                next: "Prossimo",
                "next-week": "Settimana",
                "next-month": "Mese",
                "next-year": "Anno",
                "less-than": "L'intervallo non dev'essere maggiore di %d giorni",
                "more-than": "L'intervallo non dev'essere minore di %d giorni",
                "default-more": "Seleziona un intervallo maggiore di %d giorni",
                "default-single": "Seleziona una data",
                "default-less": "Seleziona un intervallo minore di %d giorni",
                "default-range": "Seleziona un intervallo compreso tra i %d e i %d giorni",
                "default-default": "Seleziona un intervallo di date"
            },
            es: {
                selected: "Seleccionado:",
                day: "Dia",
                days: "Dias",
                apply: "Cerrar",
                "week-1": "lu",
                "week-2": "ma",
                "week-3": "mi",
                "week-4": "ju",
                "week-5": "vi",
                "week-6": "sa",
                "week-7": "do",
                "month-name": ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
                shortcuts: "Accesos directos",
                past: "Pasado",
                following: "Siguiente",
                previous: "Anterior",
                "prev-week": "Semana",
                "prev-month": "Mes",
                "prev-year": "Año",
                next: "Siguiente",
                "next-week": "Semana",
                "next-month": "Mes",
                "next-year": "Año",
                "less-than": "El rango no deberia ser mayor de %d dias",
                "more-than": "El rango no deberia ser menor de %d dias",
                "default-more": "Por favor selecciona un rango mayor a %d dias",
                "default-single": "Por favor selecciona un dia",
                "default-less": "Por favor selecciona un rango menor a %d dias",
                "default-range": "Por favor selecciona un rango entre %d y %d dias",
                "default-default": "Por favor selecciona un rango de fechas."
            },
            de: {
                selected: "Auswahl:",
                day: "Tag",
                days: "Tage",
                apply: "Schließen",
                "week-1": "mo",
                "week-2": "di",
                "week-3": "mi",
                "week-4": "do",
                "week-5": "fr",
                "week-6": "sa",
                "week-7": "so",
                "month-name": ["januar", "februar", "märz", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "dezember"],
                shortcuts: "Schnellwahl",
                past: "Vorherige",
                following: "Folgende",
                previous: "Vorherige",
                "prev-week": "Woche",
                "prev-month": "Monat",
                "prev-year": "Jahr",
                next: "Nächste",
                "next-week": "Woche",
                "next-month": "Monat",
                "next-year": "Jahr",
                "less-than": "Datumsbereich darf nicht größer sein als %d Tage",
                "more-than": "Datumsbereich darf nicht kleiner sein als %d Tage",
                "default-more": "Bitte mindestens %d Tage auswählen",
                "default-single": "Bitte ein Datum auswählen",
                "default-less": "Bitte weniger als %d Tage auswählen",
                "default-range": "Bitte einen Datumsbereich zwischen %d und %d Tagen auswählen",
                "default-default": "Bitte ein Start- und Enddatum auswählen"
            },
            ru: {
                selected: "Выбрано:",
                day: "День",
                days: "Дней",
                apply: "Закрыть",
                "week-1": "пн",
                "week-2": "вт",
                "week-3": "ср",
                "week-4": "чт",
                "week-5": "пт",
                "week-6": "сб",
                "week-7": "вс",
                "month-name": ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"],
                shortcuts: "Быстрый выбор",
                past: "Прошедшие",
                following: "Следующие",
                previous: "&nbsp;&nbsp;&nbsp;",
                "prev-week": "Неделя",
                "prev-month": "Месяц",
                "prev-year": "Год",
                next: "&nbsp;&nbsp;&nbsp;",
                "next-week": "Неделя",
                "next-month": "Месяц",
                "next-year": "Год",
                "less-than": "Диапазон не может быть больше %d дней",
                "more-than": "Диапазон не может быть меньше %d дней",
                "default-more": "Пожалуйста выберите диапазон больше %d дней",
                "default-single": "Пожалуйста выберите дату",
                "default-less": "Пожалуйста выберите диапазон меньше %d дней",
                "default-range": "Пожалуйста выберите диапазон между %d и %d днями",
                "default-default": "Пожалуйста выберите диапазон"
            },
            fr: {
                selected: "Sélection:",
                day: "Jour",
                days: "Jours",
                apply: "Fermer",
                "week-1": "lu",
                "week-2": "ma",
                "week-3": "me",
                "week-4": "je",
                "week-5": "ve",
                "week-6": "sa",
                "week-7": "di",
                "month-name": ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
                shortcuts: "Raccourcis",
                past: "Passé",
                following: "Suivant",
                previous: "Précédent",
                "prev-week": "Semaine",
                "prev-month": "Mois",
                "prev-year": "Année",
                next: "Suivant",
                "next-week": "Semaine",
                "next-month": "Mois",
                "next-year": "Année",
                "less-than": "L'intervalle ne doit pas être supérieure à %d jours",
                "more-than": "L'intervalle ne doit pas être inférieure à %d jours",
                "default-more": "Merci de choisir une intervalle supérieure à %d jours",
                "default-single": "Merci de choisir une date",
                "default-less": "Merci de choisir une intervalle inférieure %d jours",
                "default-range": "Merci de choisir une intervalle comprise entre %d et %d jours",
                "default-default": "Merci de choisir une date"
            },
            hu: {
                selected: "Kiválasztva:",
                day: "Nap",
                days: "Nap",
                apply: "Ok",
                "week-1": "h",
                "week-2": "k",
                "week-3": "sz",
                "week-4": "cs",
                "week-5": "p",
                "week-6": "sz",
                "week-7": "v",
                "month-name": ["január", "február", "március", "április", "május", "június", "július", "augusztus", "szeptember", "október", "november", "december"],
                shortcuts: "Gyorsválasztó",
                past: "Múlt",
                following: "Következő",
                previous: "Előző",
                "prev-week": "Hét",
                "prev-month": "Hónap",
                "prev-year": "Év",
                next: "Következő",
                "next-week": "Hét",
                "next-month": "Hónap",
                "next-year": "Év",
                "less-than": "A kiválasztás nem lehet több %d napnál",
                "more-than": "A kiválasztás nem lehet több %d napnál",
                "default-more": "Válassz ki egy időszakot ami hosszabb mint %d nap",
                "default-single": "Válassz egy napot",
                "default-less": "Válassz ki egy időszakot ami rövidebb mint %d nap",
                "default-range": "Válassz ki egy %d - %d nap hosszú időszakot",
                "default-default": "Válassz ki egy időszakot"
            }
        }, e.fn.dateRangePicker = function(n) {
            function a() {
                function a(t) {
                    var a = e(t).parents("table").hasClass("month2"),
                        s = a ? n.month2 : n.month1;
                    s = I(s), !n.singleDate && !a && z(s, n.month2) >= 0 || H(s) || (T(s, a ? "month2" : "month1"), C())
                }

                function r(e) {
                    var t = I(n.month1),
                        a = I(n.month2);
                    H(a) || !n.singleDate && z(t, a) >= 0 || (T(t, "month1"), T(a, "month2"), Y())
                }

                function i(t) {
                    var a = e(t).parents("table").hasClass("month2"),
                        s = a ? n.month2 : n.month1;
                    s = U(s), a && z(s, n.month1) <= 0 || H(s) || (T(s, a ? "month2" : "month1"), C())
                }

                function o(e) {
                    var t = U(n.month1),
                        a = U(n.month2);
                    H(t) || !n.singleDate && z(a, t) <= 0 || (T(a, "month2"), T(t, "month1"), Y())
                }
                var d = this;
                if (e(this).data("date-picker-opened")) return void P();
                e(this).data("date-picker-opened", !0), N = L().hide(), N.append('<div class="date-range-length-tip"></div>'), N.delegate(".day", "mouseleave", function() {
                    N.find(".date-range-length-tip").hide()
                }), e(n.container).append(N), n.inline ? N.addClass("inline-wrapper") : s(), n.alwaysOpen && N.find(".apply-btn").hide();
                var l = n.defaultTime ? n.defaultTime : new Date;
                n.lookBehind ? (n.startDate && z(l, n.startDate) < 0 && (l = I(t(n.startDate).toDate())), n.endDate && z(l, n.endDate) > 0 && (l = t(n.endDate).toDate()), T(U(l), "month1"), T(l, "month2")) : (n.startDate && z(l, n.startDate) < 0 && (l = t(n.startDate).toDate()), n.endDate && z(I(l), n.endDate) > 0 && (l = U(t(n.endDate).toDate())), T(l, "month1"), T(I(l), "month2")), n.time.enabled && (n.startDate && n.endDate || n.start && n.end ? (O(t(n.start || n.startDate).toDate(), "time1"), O(t(n.end || n.endDate).toDate(), "time2")) : (O(l, "time1"), O(l, "time2")));
                var u = "";
                u = E(n.singleDate ? "default-single" : n.minDays && n.maxDays ? "default-range" : n.minDays ? "default-more" : n.maxDays ? "default-less" : "default-default"), N.find(".default-top").html(u.replace(/\%d/, n.minDays).replace(/\%d/, n.maxDays)), n.singleMonth && N.addClass("single-month"), setTimeout(function() {
                    var e = N.find(".gap").css("margin-left");
                    e && (e = parseInt(e));
                    N.find(".month1").width(), N.find(".gap").width() + (e ? 2 * e : 0), N.find(".month2").width();
                    Q = !0
                }, 0), N.click(function(e) {
                    e.stopPropagation()
                }), e(document).bind("click.datepicker", function(e) {
                    N.is(":visible") && P()
                }), N.find(".next").click(function() {
                    !n.stickyMonths && V() ? a(this) : r(this)
                }), N.find(".prev").click(function() {
                    n.stickyMonths ? o(this) : i(this)
                }), N.delegate(".day", "click", function(t) {
                    p(e(this))
                }), N.delegate(".day", "mouseenter", function(t) {
                    y(e(this))
                }), N.attr("unselectable", "on").css("user-select", "none").bind("selectstart", function(e) {
                    return e.preventDefault(), !1
                }), N.find(".apply-btn").click(function() {
                    P();
                    var t = x(new Date(n.start)) + n.separator + x(new Date(n.end));
                    e(d).trigger("datepicker-apply", {
                        value: t,
                        date1: new Date(n.start),
                        date2: new Date(n.end)
                    })
                }), N.find("[custom]").click(function() {
                    var t = e(this).attr("custom");
                    n.start = !1, n.end = !1, N.find(".day.checked").removeClass("checked"), n.setValue.call(X, t), w(), D(!0), Y(), n.autoClose && P()
                }), N.find("[shortcut]").click(function() {
                    var t = e(this).attr("shortcut"),
                        a = new Date,
                        s = !1;
                    if (-1 != t.indexOf("day")) {
                        var r = parseInt(t.split(",", 2)[1], 10);
                        s = new Date((new Date).getTime() + 864e5 * r), a = new Date(a.getTime() + 864e5 * (r > 0 ? 1 : -1))
                    } else if (-1 != t.indexOf("week")) {
                        var i = -1 != t.indexOf("prev,") ? -1 : 1;
                        if (1 == i) var o = "monday" == n.startOfWeek ? 1 : 0;
                        else var o = "monday" == n.startOfWeek ? 0 : 6;
                        for (a = new Date(a.getTime() - 864e5); a.getDay() != o;) a = new Date(a.getTime() + 864e5 * i);
                        s = new Date(a.getTime() + 864e5 * i * 6)
                    } else if (-1 != t.indexOf("month")) {
                        var i = -1 != t.indexOf("prev,") ? -1 : 1;
                        s = 1 == i ? I(a) : U(a), s.setDate(1), a = I(s), a.setDate(1), a = new Date(a.getTime() - 864e5)
                    } else if (-1 != t.indexOf("year")) {
                        var i = -1 != t.indexOf("prev,") ? -1 : 1;
                        s = new Date, s.setFullYear(a.getFullYear() + i), s.setMonth(0), s.setDate(1), a.setFullYear(a.getFullYear() + i), a.setMonth(11), a.setDate(31)
                    } else if ("custom" == t) {
                        var d = e(this).html();
                        if (n.customShortcuts && n.customShortcuts.length > 0)
                            for (var l = 0; l < n.customShortcuts.length; l++) {
                                var u = n.customShortcuts[l];
                                if (u.name == d) {
                                    var c = [];
                                    c = u.dates.call(), c && 2 == c.length && (s = c[0], a = c[1]), c && 1 == c.length && (movetodate = c[0], T(movetodate, "month1"), T(I(movetodate), "month2"), C());
                                    break
                                }
                            }
                    }
                    s && a && (b(s, a), w())
                }), N.find(".time1 input[type=range]").bind("change mousemove", function(t) {
                    var n = t.target,
                        a = "hour" == n.name ? e(n).val().replace(/^(\d{1})$/, "0$1") : void 0,
                        s = "minute" == n.name ? e(n).val().replace(/^(\d{1})$/, "0$1") : void 0;
                    c("time1", a, s)
                }), N.find(".time2 input[type=range]").bind("change mousemove", function(t) {
                    var n = t.target,
                        a = "hour" == n.name ? e(n).val().replace(/^(\d{1})$/, "0$1") : void 0,
                        s = "minute" == n.name ? e(n).val().replace(/^(\d{1})$/, "0$1") : void 0;
                    c("time2", a, s)
                })
            }

            function s() {
                if (!n.inline) {
                    var t = e(K).offset();
                    if ("relative" == e(n.container).css("position")) {
                        {
                            e(n.container).offset(), n.containerTop, n.containerLeft
                        }
                        N.css({})
                    } else N.css(t.left < 460 ? {
                        top: t.top + e(K).outerHeight() + parseInt(e("body").css("border-top") || 0, 10),
                        left: t.left
                    } : {
                        top: t.top + e(K).outerHeight() + parseInt(e("body").css("border-top") || 0, 10) + 20,
                        left: t.left + e(K).width() - N.width() - 16
                    })
                }
            }

            function r() {
                return N
            }

            function i(t) {
                s(), o(), N.slideDown(t, function() {
                    e(K).trigger("datepicker-opened", {
                        relatedTarget: N
                    })
                }), e(K).trigger("datepicker-open", {
                    relatedTarget: N
                }), C()
            }

            function o() {
                var e = n.getValue.call(X),
                    a = e ? e.split(n.separator) : "";
                if (a && (1 == a.length && n.singleDate || a.length >= 2)) {
                    var s = n.format;
                    s.match(/Do/) && (s = s.replace(/Do/, "D"), a[0] = a[0].replace(/(\d+)(th|nd|st)/, "$1"), a.length >= 2 && (a[1] = a[1].replace(/(\d+)(th|nd|st)/, "$1"))), Q = !1, a.length >= 2 ? b(t(a[0], s, t.locale(n.language)).toDate(), t(a[1], s, t.locale(n.language)).toDate()) : 1 == a.length && n.singleDate && M(t(a[0], s, t.locale(n.language)).toDate()), Q = !0
                }
            }

            function d(e, n) {
                N.find("." + e + " input[type=range].hour-range").val(t(n).hours()), N.find("." + e + " input[type=range].minute-range").val(t(n).minutes()), c(e, t(n).format("HH"), t(n).format("mm"))
            }

            function l(e, a) {
                n[e] = parseInt(t(parseInt(a)).startOf("day").add(t(n[e + "Time"]).format("HH"), "h").add(t(n[e + "Time"]).format("mm"), "m").valueOf())
            }

            function u() {
                d("time1", n.start), d("time2", n.end)
            }

            function c(e, a, s) {
                function r(e, t) {
                    var r = t.format("HH"),
                        i = t.format("mm");
                    n[e] = t.startOf("day").add(a || r, "h").add(s || i, "m").valueOf()
                }
                switch (a && N.find("." + e + " .hour-val").text(a), s && N.find("." + e + " .minute-val").text(s), e) {
                    case "time1":
                        n.start && r("start", t(n.start)), r("startTime", t(n.startTime || t().valueOf()));
                        break;
                    case "time2":
                        n.end && r("end", t(n.end)), r("endTime", t(n.endTime || t().valueOf()))
                }
                w(), D(), Y()
            }

            function f() {
                n.start = !1, n.end = !1, N.find(".day.checked").removeClass("checked"), N.find(".day.last-date-selected").removeClass("last-date-selected"), N.find(".day.first-date-selected").removeClass("first-date-selected"), n.setValue.call(X, ""), w(), D(), Y()
            }

            function h(e) {
                var a = e;
                return "week-range" === n.batchMode ? a = "monday" === n.startOfWeek ? t(parseInt(e)).startOf("isoweek").valueOf() : t(parseInt(e)).startOf("week").valueOf() : "month-range" === n.batchMode && (a = t(parseInt(e)).startOf("month").valueOf()), a
            }

            function m(e) {
                var a = e;
                return "week-range" === n.batchMode ? a = "monday" === n.startOfWeek ? t(parseInt(e)).endOf("isoweek").valueOf() : t(parseInt(e)).endOf("week").valueOf() : "month" === n.batchMode && (a = t(parseInt(e)).endOf("month").valueOf()), a
            }

            function p(a) {
                if (!a.hasClass("invalid")) {
                    var s = a.attr("time");
                    if (a.addClass("checked"), n.singleDate ? (n.start = s, n.end = !1, n.time.enabled && l("start", n.start)) : "week" === n.batchMode ? "monday" === n.startOfWeek ? (n.start = t(parseInt(s)).startOf("isoweek").valueOf(), n.end = t(parseInt(s)).endOf("isoweek").valueOf()) : (n.end = t(parseInt(s)).endOf("week").valueOf(), n.start = t(parseInt(s)).startOf("week").valueOf()) : "month" === n.batchMode ? (n.start = t(parseInt(s)).startOf("month").valueOf(), n.end = t(parseInt(s)).endOf("month").valueOf()) : n.start && n.end || !n.start && !n.end ? (n.start = h(s), n.end = !1, n.time.enabled && l("start", n.start)) : n.start && (n.end = m(s), n.time.enabled && l("end", n.end)), !n.singleDate && n.start && n.end && n.start > n.end) {
                        var r = n.end;
                        n.end = m(n.start), n.start = h(r), n.time.enabled && u()
                    }
                    n.start = parseInt(n.start), n.end = parseInt(n.end), g(), n.start && !n.end && (e(K).trigger("datepicker-first-date-selected", {
                        date1: new Date(n.start)
                    }), y(a)), v(a), w(), D(), Y(), _()
                }
            }

            function v(t) {
                if (N.find(".day.invalid.tmp").removeClass("tmp").removeClass("invalid").addClass("valid"), n.start && !n.end) {
                    var a = parseInt(t.attr("time")),
                        s = 0,
                        r = 14340384e7;
                    N.find(".day.toMonth.invalid").not(".tmp").each(function() {
                        var t = parseInt(e(this).attr("time"));
                        t > a && r > t ? r = t : a > t && t > s && (s = t)
                    }), N.find(".day.toMonth.valid").each(function() {
                        var t = parseInt(e(this).attr("time"));
                        (s >= t || t >= r) && e(this).addClass("invalid").addClass("tmp").removeClass("valid")
                    })
                }
            }

            function y(t) {
                if (!t.hasClass("invalid")) {
                    var a = parseInt(t.attr("time"));
                    if (n.singleDate) N.find(".day.hovering").removeClass("hovering"), t.addClass("hovering");
                    else if (N.find(".day").each(function() {
                        {
                            var t = parseInt(e(this).attr("time"));
                            n.start, n.end
                        }
                        t == a ? e(this).addClass("hovering") : e(this).removeClass("hovering"), n.start && !n.end && (n.start < t && a >= t || n.start > t && t >= a) ? e(this).addClass("hovering") : e(this).removeClass("hovering")
                    }), n.start && !n.end) {
                        var s = Math.abs(Math.round((a - n.start) / 864e5)) + 1,
                            r = "";
                        if (n.hoveringTooltip && ("function" == typeof n.hoveringTooltip ? r = n.hoveringTooltip(s) : n.hoveringTooltip === !0 && s > 1 && (r = s + " days")), r) {
                            var i = t.offset(),
                                o = N.offset(),
                                d = i.left - o.left,
                                l = i.top - o.top;
                            d += t.width() / 2;
                            var u = N.find(".date-range-length-tip"),
                                c = u.css({
                                    visibility: "hidden",
                                    display: "none"
                                }).html(r).width(),
                                f = u.height();
                            d -= c / 2, l -= f, u.css({
                                left: d,
                                top: l,
                                display: "block",
                                visibility: "visible"
                            })
                        } else N.find(".date-range-length-tip").hide()
                    }
                }
            }

            function g() {
                N.find(".day.hovering").removeClass("hovering"), N.find(".date-range-length-tip").hide()
            }

            function _() {
                n.singleDate === !0 ? Q && n.start && n.autoClose && P() : Q && n.start && n.end && n.autoClose && P()
            }

            function w() {
                var e = Math.ceil((n.end - n.start) / 864e5) + 1;
                n.singleDate ? n.start && !n.end ? N.find(".drp_top-bar").removeClass("error").addClass("normal") : N.find(".drp_top-bar").removeClass("error").removeClass("normal") : n.maxDays && e > n.maxDays ? (n.start = !1, n.end = !1, N.find(".day").removeClass("checked"), N.find(".drp_top-bar").removeClass("normal").addClass("error").find(".error-top").html(E("less-than").replace("%d", n.maxDays))) : n.minDays && e < n.minDays ? (n.start = !1, n.end = !1, N.find(".day").removeClass("checked"), N.find(".drp_top-bar").removeClass("normal").addClass("error").find(".error-top").html(E("more-than").replace("%d", n.minDays))) : n.start || n.end ? N.find(".drp_top-bar").removeClass("error").addClass("normal") : N.find(".drp_top-bar").removeClass("error").removeClass("normal"), n.singleDate && n.start && !n.end || !n.singleDate && n.start && n.end ? N.find(".apply-btn").removeClass("disabled") : N.find(".apply-btn").addClass("disabled"), n.batchMode && (n.start && n.startDate && W(n.start, n.startDate) < 0 || n.end && n.endDate && W(n.end, n.endDate) > 0) && (n.start = !1, n.end = !1, N.find(".day").removeClass("checked"))
            }

            function D(t, a) {
                if (N.find(".start-day").html("..."), N.find(".end-day").html("..."), N.find(".selected-days").hide(), n.start && N.find(".start-day").html(x(new Date(parseInt(n.start)))), n.end && N.find(".end-day").html(x(new Date(parseInt(n.end)))), n.start && n.singleDate) {
                    N.find(".apply-btn").removeClass("disabled");
                    var s = x(new Date(n.start));
                    n.setValue.call(X, s, x(new Date(n.start)), x(new Date(n.end))), Q && e(K).trigger("datepicker-change", {
                        value: s,
                        date1: new Date(n.start)
                    })
                } else if (n.start && n.end) {
                    N.find(".selected-days").show().find(".selected-days-num").html(k(n.end, n.start) + 1), N.find(".apply-btn").removeClass("disabled");
                    var s = x(new Date(n.start)) + n.separator + x(new Date(n.end));
                    n.setValue.call(X, s, x(new Date(n.start)), x(new Date(n.end))), Q && !a && e(K).trigger("datepicker-change", {
                        value: s,
                        date1: new Date(n.start),
                        date2: new Date(n.end)
                    })
                } else t ? N.find(".apply-btn").removeClass("disabled") : N.find(".apply-btn").addClass("disabled")
            }

            function k(e, n) {
                var a = t(e),
                    s = t(n),
                    r = 365 * a.year() + a.dayOfYear(),
                    i = 365 * s.year() + s.dayOfYear();
                return Math.abs(r - i)
            }

            function b(e, t, a) {
                if (e.getTime() > t.getTime()) {
                    var s = t;
                    t = e, e = s, s = null
                }
                var r = !0;
                return n.startDate && W(e, n.startDate) < 0 && (r = !1), n.endDate && W(t, n.endDate) > 0 && (r = !1), r ? (n.start = e.getTime(), n.end = t.getTime(), n.time.enabled && (d("time1", e), d("time2", t)), (n.stickyMonths || W(e, t) > 0 && 0 == z(e, t)) && (n.lookBehind ? e = U(t) : t = I(e)), n.stickyMonths && z(t, n.endDate) > 0 && (e = U(e), t = U(t)), n.stickyMonths || 0 == z(e, t) && (n.lookBehind ? e = U(t) : t = I(e)), T(e, "month1"), T(t, "month2"), C(), w(), D(!1, a), void _()) : (T(n.startDate, "month1"), T(I(n.startDate), "month2"), void C())
            }

            function M(e) {
                var t = !0;
                return n.startDate && W(e, n.startDate) < 0 && (t = !1), n.endDate && W(e, n.endDate) > 0 && (t = !1), t ? (n.start = e.getTime(), n.time.enabled && d("time1", e), T(e, "month1"), C(), D(), void _()) : void T(n.startDate, "month1")
            }

            function Y() {
                (n.start || n.end) && N.find(".day").each(function() {
                    var a = parseInt(e(this).attr("time")),
                        s = n.start,
                        r = n.end;
                    n.time.enabled && (a = t(a).startOf("day").valueOf(), s = t(s || t().valueOf()).startOf("day").valueOf(), r = t(r || t().valueOf()).startOf("day").valueOf()), n.start && n.end && r >= a && a >= s || n.start && !n.end && t(s).format("YYYY-MM-DD") == t(a).format("YYYY-MM-DD") ? e(this).addClass("checked") : e(this).removeClass("checked"), n.start && t(s).format("YYYY-MM-DD") == t(a).format("YYYY-MM-DD") ? e(this).addClass("first-date-selected") : e(this).removeClass("first-date-selected"), n.end && t(r).format("YYYY-MM-DD") == t(a).format("YYYY-MM-DD") ? e(this).addClass("last-date-selected") : e(this).removeClass("last-date-selected")
                })
            }

            function T(e, a) {
                e = t(e).toDate();
                var s = S(e.getMonth());
                N.find("." + a + " .month-name").html(s + " " + e.getFullYear()), N.find("." + a + " tbody").html(R(e)), n[a] = e
            }

            function O(e, t) {
                N.find("." + t).append(F()), d(t, e)
            }

            function S(e) {
                return E("month-name")[e]
            }

            function x(e) {
                return t(e).format(n.format)
            }

            function C() {
                Y();
                var e = parseInt(t(n.month1).format("YYYYMM")),
                    a = parseInt(t(n.month2).format("YYYYMM")),
                    s = Math.abs(e - a),
                    r = s > 1 && 89 != s;
                r ? N.find(".gap").css("visibility", "visible") : N.find(".gap").css("visibility", "hidden");
                var i = N.find("table.month1").height(),
                    o = N.find("table.month2").height();
                N.find(".gap").height(Math.max(i, o) + 10)
            }

            function P() {
                n.alwaysOpen || (e(N).slideUp(n.duration, function() {
                    e(K).data("date-picker-opened", !1), e(K).trigger("datepicker-closed", {
                        relatedTarget: N
                    })
                }), e(K).trigger("datepicker-close", {
                    relatedTarget: N
                }))
            }

            function z(e, n) {
                var a = parseInt(t(e).format("YYYYMM")) - parseInt(t(n).format("YYYYMM"));
                return a > 0 ? 1 : 0 == a ? 0 : -1
            }

            function W(e, n) {
                var a = parseInt(t(e).format("YYYYMMDD")) - parseInt(t(n).format("YYYYMMDD"));
                return a > 0 ? 1 : 0 == a ? 0 : -1
            }

            function I(e) {
                return t(e).add(1, "months").toDate()
            }

            function U(e) {
                return t(e).add(-1, "months").toDate()
            }

            function F() {}

            function L() {
                var t = '<div class="date-picker-wrapper';
                if (n.extraClass && (t += " " + n.extraClass + " "), n.singleDate && (t += " single-date "), n.showShortcuts || (t += " no-shortcuts "), n.showTopbar || (t += " no-topbar "), t += '">', n.showTopbar && (t += '<div class="drp_top-bar">', n.customTopBar ? ("function" == typeof n.customTopBar && (n.customTopBar = n.customTopBar()), t += '<div class="custom-top">' + n.customTopBar + "</div>") : (t += '<div class="normal-top">\r\n							<span style="color:#333">' + E("selected") + ' </span> <b class="start-day">...</b>', n.singleDate || (t += ' <span class="separator-day">' + n.separator + '</span> <b class="end-day">...</b> <i class="selected-days">(<span class="selected-days-num">3</span> ' + E("days") + ")</i>"), t += "</div>"), t += '<div class="error-top">error</div>\r\n						<div class="default-top">default</div>\r\n						<input type="button" class="apply-btn disabled' + G() + '" value="' + E("apply") + '" />', t += "</div>"), t += '<div class="month-wrapper"><table class="month1"><thead><tr class="caption"><th style="width:27px;"><span class="prev"></span></th><th colspan="5" class="month-name">January, 2011</th><th style="width:27px;">' + (n.singleDate || !n.stickyMonths ? '<span class="next"></span>' : "") + '</th></tr><tr class="week-name">' + j() + "</thead><tbody></tbody></table>", V() && (t += '<div class="gap">' + A() + '</div><table class="month2"><thead><tr class="caption"><th style="width:27px;">' + (n.stickyMonths ? "" : '<span class="prev"></span>') + '</th><th colspan="5" class="month-name">January, 2011</th><th style="width:27px;"><span class="next"></span></th></tr><tr class="week-name">' + j() + "</thead><tbody></tbody></table>"), t += '<div style="clear:both;height:0;font-size:0;"></div><div class="time"><div class="time1"></div>', n.singleDate || (t += '<div class="time2"></div>'), t += '</div><div style="clear:both;height:0;font-size:0;"></div></div>', t += '<div class="footer">', n.showShortcuts) {
                    t += '<div class="shortcuts"><b>' + E("shortcuts") + "</b>";
                    var a = n.shortcuts;
                    if (a) {
                        if (a["prev-days"] && a["prev-days"].length > 0) {
                            t += '&nbsp;<span class="prev-days">' + E("past");
                            for (var s = 0; s < a["prev-days"].length; s++) {
                                var r = a["prev-days"][s];
                                r += E(a["prev-days"][s] > 1 ? "days" : "day"), t += ' <a href="javascript:;" shortcut="day,-' + a["prev-days"][s] + '">' + r + "</a>"
                            }
                            t += "</span>"
                        }
                        if (a["next-days"] && a["next-days"].length > 0) {
                            t += '&nbsp;<span class="next-days">' + E("following");
                            for (var s = 0; s < a["next-days"].length; s++) {
                                var r = a["next-days"][s];
                                r += E(a["next-days"][s] > 1 ? "days" : "day"), t += ' <a href="javascript:;" shortcut="day,' + a["next-days"][s] + '">' + r + "</a>"
                            }
                            t += "</span>"
                        }
                        if (a.prev && a.prev.length > 0) {
                            t += '&nbsp;<span class="prev-buttons">' + E("previous");
                            for (var s = 0; s < a.prev.length; s++) {
                                var r = E("prev-" + a.prev[s]);
                                t += ' <a href="javascript:;" shortcut="prev,' + a.prev[s] + '">' + r + "</a>"
                            }
                            t += "</span>"
                        }
                        if (a.next && a.next.length > 0) {
                            t += '&nbsp;<span class="next-buttons">' + E("next");
                            for (var s = 0; s < a.next.length; s++) {
                                var r = E("next-" + a.next[s]);
                                t += ' <a href="javascript:;" shortcut="next,' + a.next[s] + '">' + r + "</a>"
                            }
                            t += "</span>"
                        }
                    }
                    if (n.customShortcuts)
                        for (var s = 0; s < n.customShortcuts.length; s++) {
                            var i = n.customShortcuts[s];
                            t += '&nbsp;<span class="custom-shortcut"><a href="javascript:;" shortcut="custom">' + i.name + "</a></span>"
                        }
                    t += "</div>"
                }
                if (n.showCustomValues && (t += '<div class="customValues"><b>' + (n.customValueLabel || E("custom-values")) + "</b>", n.customValues))
                    for (var s = 0; s < n.customValues.length; s++) {
                        var o = n.customValues[s];
                        t += '&nbsp;<span class="custom-value"><a href="javascript:;" custom="' + o.value + '">' + o.name + "</a></span>"
                    }
                return t += "</div></div>", e(t)
            }

            function G() {
                return klass = "", n.autoClose === !0 && (klass += " hide"), "" !== n.applyBtnClass && (klass += " " + n.applyBtnClass), klass
            }

            function j() {
                return "monday" == n.startOfWeek ? "<th>" + E("week-1") + "</th>\r\n					<th>" + E("week-2") + "</th>\r\n					<th>" + E("week-3") + "</th>\r\n					<th>" + E("week-4") + "</th>\r\n					<th>" + E("week-5") + "</th>\r\n					<th>" + E("week-6") + "</th>\r\n					<th>" + E("week-7") + "</th>" : "<th>" + E("week-7") + "</th>\r\n					<th>" + E("week-1") + "</th>\r\n					<th>" + E("week-2") + "</th>\r\n					<th>" + E("week-3") + "</th>\r\n					<th>" + E("week-4") + "</th>\r\n					<th>" + E("week-5") + "</th>\r\n					<th>" + E("week-6") + "</th>"
            }

            function H(e) {
                var e = t(e);
                return n.startDate && e.endOf("month").isBefore(n.startDate) ? !0 : n.endDate && e.startOf("month").isAfter(n.endDate) ? !0 : !1
            }

            function A() {
                for (var e = ['<div class="gap-top-mask"></div><div class="gap-bottom-mask"></div><div class="gap-lines">'], t = 0; 20 > t; t++) e.push('<div class="gap-line">\r\n					<div class="gap-1"></div>\r\n					<div class="gap-2"></div>\r\n					<div class="gap-3"></div>\r\n				</div>');
                return e.push("</div>"), e.join("")
            }

            function V() {
                return !n.singleDate && !n.singleMonth
            }

            function $(e, t, n) {
                var a = jQuery.extend(!0, {}, e);
                jQuery.each(t, function(e, t) {
                    var s = t(n);
                    for (var r in s) a.hasOwnProperty(r) ? a[r] += s[r] : a[r] = s[r]
                }), attrString = "";
                for (var s in a) a.hasOwnProperty(s) && (attrString += s + '="' + a[s] + '" ');
                return attrString
            }

            function R(e) {
                var a = [];
                e.setDate(1);
                var s = (new Date(e.getTime() - 864e5), new Date),
                    r = e.getDay();
                if (0 == r && "monday" == n.startOfWeek && (r = 7), r > 0)
                    for (var i = r; i > 0; i--) {
                        var o = new Date(e.getTime() - 864e5 * i),
                            d = !0;
                        n.startDate && W(o, n.startDate) < 0 && (d = !1), n.endDate && W(o, n.endDate) > 0 && (d = !1), a.push({
                            type: "lastMonth",
                            day: o.getDate(),
                            time: o.getTime(),
                            valid: d
                        })
                    }
                for (var l = e.getMonth(), i = 0; 40 > i; i++) {
                    var u = t(e).add(i, "days").toDate(),
                        d = !0;
                    n.startDate && W(u, n.startDate) < 0 && (d = !1), n.endDate && W(u, n.endDate) > 0 && (d = !1), a.push({
                        type: u.getMonth() == l ? "toMonth" : "nextMonth",
                        day: u.getDate(),
                        time: u.getTime(),
                        valid: d
                    })
                }
                for (var c = [], f = 0; 6 > f && "nextMonth" != a[7 * f].type; f++) {
                    c.push("<tr>");
                    for (var o = 0; 7 > o; o++) {
                        var h = "monday" == n.startOfWeek ? o + 1 : o,
                            u = a[7 * f + h],
                            m = t(u.time).format("L") == t(s).format("L");
                        if (u.extraClass = "", u.tooltip = "", n.beforeShowDay && "function" == typeof n.beforeShowDay) {
                            var p = n.beforeShowDay(t(u.time).toDate());
                            u.valid = p[0], u.extraClass = p[1] || "", u.tooltip = p[2] || "", "" != u.tooltip && (u.extraClass += " has-tooltip ")
                        }
                        todayDivAttr = {
                            time: u.time,
                            title: u.tooltip,
                            "class": "day " + u.type + " " + u.extraClass + " " + (u.valid ? "valid" : "invalid") + " " + (m ? "real-today" : "")
                        }, c.push("<td " + $({}, n.dayTdAttrs, u) + "><div " + $(todayDivAttr, n.dayDivAttrs, u) + ">" + B(u.time, u.day) + "</div></td>")
                    }
                    c.push("</tr>")
                }
                return c.join("")
            }

            function B(e, t) {
                return n.showDateFilter && "function" == typeof n.showDateFilter ? n.showDateFilter(e, t) : t
            }

            function Z() {
                if ("auto" == n.language) {
                    var t = navigator.language ? navigator.language : navigator.browserLanguage;
                    if (!t) return e.dateRangePickerLanguages.en;
                    var t = t.toLowerCase();
                    for (var a in e.dateRangePickerLanguages)
                        if (-1 != t.indexOf(a)) return e.dateRangePickerLanguages[a];
                    return e.dateRangePickerLanguages.en
                }
                return n.language && n.language in e.dateRangePickerLanguages ? e.dateRangePickerLanguages[n.language] : e.dateRangePickerLanguages.en
            }

            function E(e) {
                var t = e.toLowerCase();
                return e in J ? J[e] : t in J ? J[t] : e
            }
            n || (n = {}), n = e.extend(!0, {
                autoClose: !1,
                format: "YYYY-MM-DD",
                separator: " to ",
                language: "auto",
                startOfWeek: "sunday",
                getValue: function() {
                    return e(this).val()
                },
                setValue: function(t) {
                    e(this).attr("readonly") || e(this).is(":disabled") || t == e(this).val() || e(this).val(t)
                },
                startDate: !1,
                endDate: !1,
                time: {
                    enabled: !1
                },
                minDays: 0,
                maxDays: 0,
                showShortcuts: !0,
                shortcuts: {
                    "next-days": [3, 5, 7],
                    next: ["week", "month", "year"]
                },
                customShortcuts: [],
                inline: !1,
                container: "body",
                containerTop: "auto",
                containerLeft: "auto",
                alwaysOpen: !1,
                singleDate: !1,
                lookBehind: !1,
                batchMode: !1,
                duration: 200,
                stickyMonths: !1,
                dayDivAttrs: [],
                dayTdAttrs: [],
                applyBtnClass: "",
                singleMonth: "auto",
                hoveringTooltip: function(e) {
                    return e > 1 ? e + " days" : ""
                },
                showTopbar: !0
            }, n), n.start = !1, n.end = !1, "auto" == n.singleMonth && (n.singleMonth = e(window).width() < 480), n.showTopbar || (n.autoClose = !0), n.startDate && "string" == typeof n.startDate && (n.startDate = t(n.startDate, n.format).toDate()), n.endDate && "string" == typeof n.endDate && (n.endDate = t(n.endDate, n.format).toDate());
            var N, q, J = Z(),
                Q = !1,
                K = this,
                X = e(K).get(0);
            return e(this).unbind(".datepicker").bind("click.datepicker", function(e) {
                var t = N.is(":visible");
                e.stopPropagation(), t || i(n.duration)
            }).bind("change.datepicker", function(e) {
                o()
            }).bind("keyup.datepicker", function() {
                try {
                    clearTimeout(q)
                } catch (e) {}
                q = setTimeout(function() {
                    o()
                }, 2e3)
            }), a.call(this), n.alwaysOpen && i(0), e(this).data("dateRangePicker", {
                setDateRange: function(e, a, s) {
                    "string" == typeof e && "string" == typeof a && (e = t(e, n.format).toDate(), a = t(a, n.format).toDate()), b(e, a, s)
                },
                clear: f,
                close: P,
                open: i,
                getDatePicker: r,
                destroy: function() {
                    e(K).unbind(".datepicker"), e(K).data("dateRangePicker", ""), e(K).data("date-picker-opened", null), N.remove(), e(window).unbind("resize.datepicker", s), e(document).unbind("click.datepicker", P)
                }
            }), e(window).bind("resize.datepicker", s), this
        }
    }),
    function() {
        {
            var e = new Date,
                t = $(".filter__option-dropdown-date"),
                n = e.getUTCMonth() + 1,
                a = e.getUTCDate() + "." + n + "." + e.getUTCFullYear(),
                s = $(".filterDropdown"),
                r = ($(".date-picker-wrapper"), $("#filterBlock")),
                i = $(".o-filter-panel__sort--right");
            $(".o-filter-panel__badge", i)
        }
        t.dateRangePicker({
            showShortcuts: !1,
            startDate: a,
            startOfWeek: "monday",
            autoClose: !0,
            format: "DD.MM.YYYY",
            duration: 0,
            separator: "-",
            hoveringTooltip: !1,
            stickyMonths: !0,
            container: "#filter",
            getValue: function() {
                return this.innerHTML
            },
            setValue: function(e, t, n) {
                var a = $(".o-filter-panel__sort--right"),
                    s = ($(".o-filter-panel__badge", a), function() {
                        return '<div class="o-filter-panel__badge date" data-date="' + e + '"><span>с ' + t + " по " + n + '</span><a href="#" class="link remove"><i class="icon ion-ios-close-empty"></i ></a></div>'
                    });
                a.find(".date").remove(), a.append(s)
            }
        }).on("click", function() {
            $(this).hasClass("open") ? (t.data("dateRangePicker").close(), t.removeClass("open").addClass("close-date")) : $(this).hasClass("close-date") && (t.data("dateRangePicker").open(), t.removeClass("close-date").addClass("open"))
        }).bind("datepicker-open", function() {
            r.find(".dropdown").removeClass("open")
        }).bind("datepicker-close", function() {
            $(".date-picker-wrapper .footer").empty()
        }).bind("datepicker-first-date-selected", function(e, t) {
            $("<p>Выберите дату не позднее которой хотите вернуться</p>").appendTo(".date-picker-wrapper .footer")
        }), s.on("show.bs.dropdown", function() {
            t.data("dateRangePicker").close(), r.find("a.daterange").removeClass("open")
        }), i.on("click", "a.remove", function(e) {
            e.preventDefault(), $(this).parent().hasClass("date") && (t.data("dateRangePicker").clear(), i.find(".date").remove())
        })
    }();