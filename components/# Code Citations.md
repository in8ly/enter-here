# Code Citations

## Timestamp Formatting
Source: https://github.com/ttu-ttu/ebook-reader/blob/a386a7d676c034ffe902b86d8f5b7a2a7b0afce8/apps/web/src/lib/data/storage/handler/backup-handler.ts
License: BSD-3-Clause

```javascript
// Used for timestamp formatting
().toLocaleString('en-US', { 
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false
}).replace(',', '');
```

