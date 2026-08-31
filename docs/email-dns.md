# Email DNS — deenesocial.com

Mail for the domain is hosted on **Zoho Mail** (US datacenter). DNS is on
**Cloudflare**, zone `deenesocial.com`. The web A records point at GitHub Pages;
the records below are mail-only and unrelated to the site deploy.

## Why these records exist

Until 2026-08-31 the zone had **no TXT records at all** — no SPF, no DKIM, no
DMARC. Mail from `alex@deenesocial.com` therefore arrived at receiving servers
completely unauthenticated. Google Workspace responds to that with a temporary
rejection rather than a bounce, so the sending server retried on a backoff
schedule. The visible symptom was mail arriving in clumps minutes or hours late
instead of on send, in both directions, with no error shown to either party.

## Current records

| Type | Name | Value |
| --- | --- | --- |
| TXT | `deenesocial.com` | `v=spf1 include:zoho.com ~all` |
| TXT | `deene-social._domainkey` | `v=DKIM1; k=rsa; p=MIGf…` (1024-bit RSA, issued by Zoho) |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:info@deenesocial.com; adkim=r; aspf=r` |

TTL is 300 on all three so a correction propagates in five minutes. Raise to
3600 once DMARC reports have been clean for a while.

## Notes and gotchas

**Use `include:zoho.com`, not `include:zohomail.com`.** The Zoho admin console
suggests `zohomail.com`, or a merged value containing both. Expanded, `zoho.com`
resolves to 66 IPv4 entries and `zohomail.com` to 8, with **zero** in
`zohomail.com` that are not already in `zoho.com` — it nests `spf.zohomail.com`
inside itself. Switching would narrow authorisation for no gain; merging spends
two extra DNS lookups for no gain. The current record costs 5 of the 10 permitted
lookups.

**The Zoho console's "multiple SPF records" warning is a false positive.** It
fires whenever any SPF record already exists that is not the literal string it
wanted to write. Verify the real count with
`dig +short TXT deenesocial.com | grep -c 'v=spf1'` — it should be 1.

**Publishing the DKIM record does not enable signing.** The selector must also
be marked verified in Zoho Mail Admin → Domains → deenesocial.com → Email
Configuration → DKIM. Until then outbound mail leaves unsigned and only SPF
protects it.

**DMARC is deliberately at `p=none`.** That is monitor-only: it collects
aggregate reports at `info@deenesocial.com` without affecting delivery. Move to
`p=quarantine` only after the reports confirm nothing legitimate sends from
outside Zoho.

**SPF is `~all` (softfail), not `-all`.** Same reasoning — tighten once the
DMARC reports are clean.

## Verifying

```bash
dig +short TXT deenesocial.com
dig +short TXT deene-social._domainkey.deenesocial.com
dig +short TXT _dmarc.deenesocial.com
```

After DKIM is verified in Zoho, send a test message to a Gmail address and check
the received headers show `spf=pass` and `dkim=pass`.
