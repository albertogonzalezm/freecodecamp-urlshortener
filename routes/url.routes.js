const { Router } = require("express");
const shortid = require("shortid");
const validUrl = require("valid-url");
const urlSchema = require("../models/url.models");

const router = Router();

router.post("/shorturl", async (req, res) => {
    const { url: longUrl } = req.body;

    if (!validUrl.isWebUri(longUrl)) {
        return res.json({ error: "invalid url" })
    } else {

        let findUrl = await urlSchema.findOne({
            original_url: longUrl
        }, { _id: 0 });

        if (findUrl) {
            res.json(findUrl);
        } else {
            const shortUrl = shortid.generate();
            const newUrl = urlSchema({
                original_url: longUrl,
                short_url: shortUrl
            });
            await newUrl.save()
                .then((data) => {
                    res.json({ original_url: data.original_url, short_url: data.short_url });
                })
                .catch((e) => res.json({ error: e }));
        }
    }
});

router.get("/shorturl/:short_url?", async (req, res) => {
    try {
        const urlParams = await urlSchema.findOne({
            short_url: req.params.short_url
        });

        if (urlParams) {
            return res.redirect(urlParams.original_url);
        } else {
            res.status(404).json("No URL found");
        }

    } catch (error) {
        res.status(500).json("Server error")
    }
});

module.exports = router;