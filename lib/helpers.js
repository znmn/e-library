import jwt from "jsonwebtoken";
import { useEffect } from "react";

function randStr(len = 7) {
	var text = "";
	var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	for (var i = 0; i < len; i++) text += charset.charAt(Math.floor(Math.random() * charset.length));
	return text;
}

function validateToken(token) {
	if (!token) {
		return;
	}

	try {
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
		return decodedToken;
	} catch (err) {
		return;
	}
}

function parseCookies(cookieString) {
	if (!cookieString || !cookieString.includes("=")) return {};

	const cookieObject = {};
	const cookieArray = cookieString.split(";");
	for (let i = 0; i < cookieArray.length; i++) {
		const cookie = cookieArray[i].trim().split("=");
		const key = cookie[0];
		const value = decodeURIComponent(cookie[1]);
		try {
			cookieObject[key] = JSON.parse(value);
		} catch (error) {
			cookieObject[key] = value;
		}
	}
	return cookieObject;
}

function useScript(url) {
	useEffect(() => {
		if (typeof window === "undefined") return;
		const script = document.createElement("script");

		script.src = url;
		script.async = true;

		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, [url]);
}

module.exports = {
	randStr,
	validateToken,
	parseCookies,
	useScript,
};
