# UGC Creative Intelligence Analyzer

An AI-powered system that watches UGC ad videos, scores them against real performance benchmarks, and generates hook rewrites, script variants, and actionable recommendations. Built to systematize a manual review process developed across 6 years and 45+ DTC brand campaigns.

**[Live Demo →](https://victorxuorigins.github.io/ugc-creative-analyzer)**

Bring your own API keys — Gemini (~$0.001/video) and Anthropic (~$0.01/analysis). Both have free tiers sufficient for testing.

---

## Background

From 2020 I managed thousands of influencer and creator sponsorships for brands scaling from Asia into the US market — across TikTok, Instagram, and YouTube. Clients included **Anker, Eufy, Soundcore, Nebula, Genshin Impact, Midea, Zhiyun, and Dream**, primarily consumer tech brands building US audiences before the category was crowded.

We were operating at scale on TikTok before TikTok Marketplace existed. That meant sourcing creators manually, negotiating deals directly, and reviewing every piece of content before it went to paid amplification — with no tooling. By the end of that arc the channel had evolved from organic sponsorships → boosted paid media on creator videos → purpose-built UGC ads. I was doing creative analysis manually on every piece of content: reviewing hook strength, pacing, CTA placement, platform fit, creator authenticity signals.

This tool is the automated version of that process.

---

## Architecture

Two AI models doing what each does best:

```
Video file upload
      ↓
Gemini 2.5 Flash Lite — watches the video natively
Extracts: transcript, visual hook description, scene pacing,
creator energy, product visibility, text overlays, platform fit,
hook duration, total duration, scene count
      ↓
Claude Sonnet 4 — applies creative intelligence rubric
Reads: Gemini's visual analysis + domain knowledge layer
Outputs: scores, timeline segments, recommendations,
hook rewrites, script variants
      ↓
Results rendered + saved to Airtable ad library
```

**Stack:** Vanilla HTML/CSS/JS — single file, no framework, no build step. Intentional. The intelligence is in the knowledge layer and the two-model pipeline, not the UI.

---

## The Knowledge Layer

The most important part of the system is not the code — it's the system prompt that Claude reads before analyzing anything.

The system prompt encodes:
- **Authenticity spectrum** — from entertainment-first (top 1-5% of ads, the Anker kdrama example) to direct product showcase (weakest UGC format)
- **Hook performance hierarchy** — comedy/entertainment → curiosity gap → POV/relatable → reply-to-comment → bold claim → pain point direct
- **Fatal flaw framework** — 7 specific patterns that consistently kill performance, flagged as priority recommendations
- **Platform-specific rules** — TikTok hook window is 1.5s, Instagram is 2s, YouTube Shorts is 3s. What changes between them.
- **Product category adjustments** — consumer tech needs more education time, gaming needs entertainment-first, lifestyle needs transformation framing
- **Scoring calibration** — benchmarks derived from real campaign observation, not industry averages
- **The worthy exchange principle** — even if the viewer knows it's an ad, if it provides genuine entertainment or informational value, it earns their attention

The system prompt is a living document. Every time an output disagrees with human judgment, the gap becomes a prompt update. The system gets more accurate as the knowledge layer gets more specific.

---

## What It Outputs

**Visual Analysis (Gemini)**
- Visual hook description — what actually happens in the first 1-3 seconds
- Scene pacing — cut frequency and energy level
- Creator energy — confidence and authenticity assessment
- Product visibility — when and how clearly the product appears
- Text overlays — all on-screen text captured
- Platform fit — how native the content feels

**Scoring**
- Creative score /100
- Hook score with STRONG / MODERATE / WEAK classification
- Hook retention % (predictive)
- Avg watch time (estimated)
- CTA tap rate (estimated)
- Authenticity score /100

**Structure**
- Visual timeline breaking the ad into: Hook / Problem / Product Demo / Social Proof / CTA with duration of each segment

**Recommendations**
- 4 prioritized improvement recommendations (fatal flaws surface first)
- 4 alternative hook rewrites across: Curiosity Gap, Bold Claim, Pain Point, Social Proof Open
- 3 full script rewrite variants: Emotional, Direct Response, Storytelling

**Export**
- Download complete report as standalone HTML file
- Save all 29 data points to Airtable ad library automatically

---

## Ad Library / Knowledge Base

Every analysis saves to Airtable with 29 individual fields including all scores, all Gemini visual data, transcript, timeline breakdown, and all generated content. Scripts Generated table auto-populates with every hook and rewrite variant.

Over time this becomes a proprietary benchmark database — real ads, real scores, real patterns. After 50+ analyses the benchmark layer reflects actual observed data rather than industry averages.

---

## Known Limitations & Production Roadmap

**Current limitations (intentional for portfolio scope):**
- API keys entered client-side — production would proxy through a server-side function (Vercel Edge or Cloudflare Worker)
- Video analysis requires file upload — Gemini cannot fetch arbitrary social media URLs; users download first via SnapTik or Meta Ad Library
- Benchmark scores are static in the system prompt — production pulls dynamically from the Airtable library as it grows

**Next build (Day 3-7):**
- n8n automation: Google Drive upload → auto-trigger analysis → Airtable save → Slack report
- Weekly creative fatigue report: scheduled scan of active ads, flags declining performance
- Script generation engine: input product brief → output 20-30 script variants with different hooks and angles
- Competitor benchmarking: compare against similar ads already in the library

---

## Using the Tool

1. Get a free Gemini API key at [aistudio.google.com](https://aistudio.google.com)
2. Get an Anthropic API key at [console.anthropic.com](https://console.anthropic.com) (~$5 covers hundreds of analyses)
3. Download your video (TikTok → SnapTik, Meta Ad Library → native download button)
4. Upload, fill in brand/platform/niche, hit Analyze
5. Optionally add Airtable credentials to save to your library

---

*Built May 2026 — systematizing six years of manual creative operations for brands including Anker, Eufy, Soundcore, and Nebula.*
*Part of an AI-native growth systems portfolio by Victor Xu.*
