# Architect Utils changelog

---

## [1.2.3] 2019-07-23

### Added

- Adds lib of Windows-compatible special chars set to de-munge printing on Windows machines

---

## [1.2.0-2] 2019-07-15

### Added

- Static asset fingerprint util (and related tests)
  - Responsible for managing `public/static.json`
  - Returns static asset manifest when called
  - Also has `fingerprint.config()` API available for returning `@static fingerprint` and `@static ignore` config

---

## [1.0.13, 1.0.14, 1.0.15, 1.0.16, 1.1.0]

// Needs backfilling!

---

## [1.0.12] 2019-06-17

### Changed

- Tiny console log copy edit

---

## [1.0.10-11] 2019-06-13

### Added

- Adds `populate-arc` module, which loads basic required Architect project config
- Adds `populate-aws` module, which fixes missing (optional) AWS env vars in banner


### Changed

- Disabling banner is now `disableBanner`
- Banner AWS region / profile can now be disabled with `disableRegion` and `disableProfile`
- Common banner logger added in preparation for additional banner customization

---

## [1.0.9] 2019-06-12

### Added
- Option to disable banner printing with `banner({disabled:true})`


### Changed

- Moving towards passing parameters (to things like the banner) instead of using env vars

---

## [1.0.5-8] 2019-06-11

### Added

- Added shared banner printer


### Changed

- Reverted tidying of subfolder structure in service of making requiring a little nicer

---

## [1.0.4] 2019-05-29

### Fixes

- Updates readArc to error if Architect manifest isn't found

---

## [1.0.3] 2019-05-29

### Added

- This here library! Broken out of `@architect/architect`, we will now be maintaining `utils` as a standalone module, and reincorporating it back into future versions of Architect.

---

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
