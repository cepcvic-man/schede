## ADDED Requirements

### Requirement: Mobile home prioritizes sheet lookup

The home experience SHALL prioritize finding and opening sheets within the first mobile viewport.

#### Scenario: Mobile first viewport exposes primary actions

- **WHEN** the home is viewed on a narrow mobile viewport
- **THEN** the title/status, search input, and available `Pulizia` entry point are visible before any long unavailable-category content

#### Scenario: Search remains the primary lookup path

- **WHEN** the user types in the home search input
- **THEN** matching sheet results are shown using the existing sheet search behavior

### Requirement: Available category is visually primary

The home experience SHALL make the available `Pulizia` category more prominent than future unavailable categories.

#### Scenario: Pulizia opens the manual

- **WHEN** the user activates the `Pulizia` entry point
- **THEN** the manual view opens using the existing sheet list and first selected sheet behavior

#### Scenario: Future categories do not dominate mobile

- **WHEN** the home is viewed on mobile
- **THEN** unavailable categories are presented in a compact lower-priority format with clear `In preparazione` status

### Requirement: Home preserves existing manual workflows

The home redesign SHALL preserve existing manual navigation, sheet opening, and print workflows.

#### Scenario: Sheet result opens selected sheet

- **WHEN** the user selects a sheet from home search results
- **THEN** the app opens the manual view with that sheet active

#### Scenario: Manual workflow remains unchanged

- **WHEN** the user enters the manual view from the redesigned home
- **THEN** the index panel, viewer iframe, mobile menu, and print action continue to behave as before

### Requirement: Desktop keeps operational dashboard hierarchy

The desktop home SHALL use the same operational hierarchy as mobile while preserving a comfortable wider layout.

#### Scenario: Desktop shows search before category browsing

- **WHEN** the home is viewed on a desktop viewport
- **THEN** search and available manual entry are presented before or alongside supporting status information

#### Scenario: Desktop avoids oversized landing hero

- **WHEN** the desktop home loads
- **THEN** the first viewport is not dominated by a tall decorative hero section
