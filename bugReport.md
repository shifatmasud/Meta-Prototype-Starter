# Bug Report

## Known Issues
- **Dynamic Imports**: Newly created components require a full page reload to be imported as real React modules. Current workaround uses `customCode` staging.
- **FS Security**: The FS API is currently open to the entire project directory (intended for prototype use).
