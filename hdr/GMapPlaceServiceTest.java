package app.map.gmap;

import app.map.api.GMapGetTimeZoneRequest;
import app.map.api.GMapGetTimeZoneResponse;
import app.map.api.Location;
import app.map.api.PlaceDetailsRequest;
import app.map.api.PlaceDetailsResponse;
import app.map.api.googlemap.AutocompleteRequest;
import app.map.api.googlemap.AutocompleteResponse;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Instant;
import java.util.Date;
import java.util.Locale;
import java.util.HashMap;
import java.util.Map;
import java.util.TimeZone;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertNotNull;

/**
 * @author Yanni
 */
class GMapPlaceServiceTest {

    @Test
    @Disabled
    void detail() {
        GMapPlaceService gMapPlaceService = new GMapPlaceService("AIzaSyDL1iNx1uEC2-bmueBBWVx-RSh0grDEAAZ", null);
        PlaceDetailsRequest request = new PlaceDetailsRequest();
        request.placeId = "ChIJpbhV5qpZwokRQla5Ks68Gss";
        request.includeTimeZone = Boolean.TRUE;
        PlaceDetailsResponse response = gMapPlaceService.detail(request);
        assertNotNull(response);
        assertNotNull(response.location);
    }

    String apiKey = "AIzaSyCwR_Y2b1B_K94fjgfEPMbacBSLU2JVcyQ";
//    String apiKey = "AIzaSyB5uLr_6ILUq44TIBF2r2971gRCy78EqNk";
//    String apiKey = "AIzaSyDL1iNx1uEC2-bmueBBWVx-RSh0grDEAAE";

    @Test
    void autocompleteGoogleMapRequest() {
        GMapPlaceService gMapPlaceService = new GMapPlaceService(apiKey, null);
        AutocompleteRequest request = new AutocompleteRequest();
        request.input = "2030 Broadway";
        request.location = new Location();
        request.location.latitude = 40.77674917198916;
        request.location.longitude = -73.98177848943362;
        request.radius = 16000;

        AutocompleteResponse response = gMapPlaceService.autocomplete(request);

        PlaceDetailsRequest placeDetailsRequest = new PlaceDetailsRequest();
        placeDetailsRequest.placeId = response.predictions.getFirst().placeId;
        placeDetailsRequest.includeTimeZone = true;
        PlaceDetailsResponse placeDetailsResponse = gMapPlaceService.detail(placeDetailsRequest);
        System.out.println(placeDetailsResponse.timeZoneId);
        System.out.println(placeDetailsResponse.timeZoneName);

        assertNotNull(response);
        assertNotNull(response.predictions);
        assertFalse(response.predictions.isEmpty());
        assertNotNull(response.predictions.getFirst().placeId);
        assertNotNull(response.predictions.getFirst().description);
    }


    @Test
    @Disabled
    void getTimeZone() {
        GMapPlaceService gMapPlaceService = new GMapPlaceService("AIzaSyDL1iNx1uEC2-bmueBBWVx-RSh0grDEAAZ", null);
        var request = new GMapGetTimeZoneRequest();
        request.location = new Location();
        request.location.latitude = 40.77674917198916;
        request.location.longitude = -73.98177848943362;
//        request.includeTimeZone = Boolean.TRUE;
        GMapGetTimeZoneResponse timeZone = gMapPlaceService.getTimeZone(request);
        assertNotNull(timeZone);
        assertEquals("America/New_York", timeZone.timeZoneId);
    }

    @Test
    void updateSiteTrackerTimeZone() throws IOException {
        String inputPath = "/Users/yannilan/Downloads/Development Dashboard  (8).xlsx";
        String outputPath = "/Users/yannilan/Downloads/Development Dashboard  (8)-timezone.xlsx";
        String apiKey = "AIzaSyB5uLr_6ILUq44TIBF2r2971gRCy78EqNk";
        SiteTrackerUpdateConfig config = new SiteTrackerUpdateConfig(inputPath, outputPath, apiKey, 5000, true);
        GMapPlaceService service = new GMapPlaceService(config.apiKey, config.timeoutInMillis);
        try (InputStream inputStream = Files.newInputStream(config.inputPath);
             Workbook workbook = WorkbookFactory.create(inputStream)) {
            Sheet sheet = workbook.getSheet(config.sheetName);
            assertNotNull(sheet);
            HeaderColumns columns = ensureTimeZoneColumns(sheet, config);
            UpdateSummary summary = updateRows(sheet, columns, service, config.overwrite);
            try (OutputStream outputStream = Files.newOutputStream(config.outputPath)) {
                workbook.write(outputStream);
            }
            System.out.printf("output=%s, updated=%d, skipped=%d, failed=%d%n",
                    config.outputPath, summary.updatedRows, summary.skippedRows, summary.failedRows);
        }
    }

    @Test
    void parseLocationSkipsDirectionalDms() {
        Location location = parseLocation("32°53'47.81\"N,  96°57'29.05\"W", 226);

        assertNull(location);
    }

    @Test
    void timeZoneDisplayNameUsesDaylightSavingTimeWhenApplicable() {
        TimeZone timeZone = TimeZone.getTimeZone("America/New_York");

        String displayName = GMapPlaceService.timeZoneDisplayName(timeZone, Date.from(Instant.parse("2026-07-03T12:00:00Z")));

        assertEquals("Eastern Daylight Time", displayName);
    }

    @Test
    void timeZoneDisplayNameUsesStandardTimeOutsideDaylightSavingTime() {
        TimeZone timeZone = TimeZone.getTimeZone("America/New_York");

        String displayName = GMapPlaceService.timeZoneDisplayName(timeZone, Date.from(Instant.parse("2026-01-03T12:00:00Z")));

        assertEquals("Eastern Standard Time", displayName);
    }

    private HeaderColumns ensureTimeZoneColumns(Sheet sheet, SiteTrackerUpdateConfig config) {
        Row headerRow = sheet.getRow(0);
        assertNotNull(headerRow);
        int latLongColumnIndex = findHeaderColumn(headerRow, config.latLongHeader);
        int timeZoneIdColumnIndex = latLongColumnIndex + 1;
        int timeZoneNameColumnIndex = latLongColumnIndex + 2;
        if (!headerMatches(headerRow, timeZoneIdColumnIndex, config.timeZoneIdHeader)
                || !headerMatches(headerRow, timeZoneNameColumnIndex, config.timeZoneNameHeader)) {
            sheet.shiftColumns(timeZoneIdColumnIndex, maxColumnIndex(sheet), 2);
            copyColumnStyle(sheet, timeZoneIdColumnIndex, config.timeZoneIdHeader, timeZoneNameColumnIndex + 1);
            copyColumnStyle(sheet, timeZoneNameColumnIndex, config.timeZoneNameHeader, timeZoneNameColumnIndex + 1);
        }
        return new HeaderColumns(latLongColumnIndex, timeZoneIdColumnIndex, timeZoneNameColumnIndex);
    }

    private UpdateSummary updateRows(Sheet sheet, HeaderColumns columns, GMapPlaceService service, boolean overwrite) {
        Map<String, GMapGetTimeZoneResponse> cache = new HashMap<>();
        int updatedRows = 0;
        int skippedRows = 0;
        int failedRows = 0;
        for (int rowIndex = 1; rowIndex <= sheet.getLastRowNum(); rowIndex++) {
            Row row = sheet.getRow(rowIndex);
            if (row == null) continue;
            String latLong = cellText(row.getCell(columns.latLongColumnIndex));
            if (latLong == null || latLong.isBlank() || isHeaderLike(latLong)) {
                skippedRows++;
                continue;
            }
            if (!overwrite && hasTimeZone(row, columns)) {
                skippedRows++;
                continue;
            }
            Location location = parseLocation(latLong, rowIndex + 1);
            if (location == null) {
                skippedRows++;
                continue;
            }
            GMapGetTimeZoneResponse response = cache.computeIfAbsent(latLong.trim(), key -> getTimeZone(service, location));
            if (response.timeZoneId == null || response.timeZoneId.isBlank()) {
                failedRows++;
                continue;
            }
            copyValue(row, columns.timeZoneIdColumnIndex, response.timeZoneId, columns.timeZoneNameColumnIndex + 1);
            copyValue(row, columns.timeZoneNameColumnIndex, response.timeZoneName, columns.timeZoneNameColumnIndex + 1);
            updatedRows++;
        }
        return new UpdateSummary(updatedRows, skippedRows, failedRows);
    }

    private void copyColumnStyle(Sheet sheet, int targetColumnIndex, String header, int styleSourceColumnIndex) {
        for (int rowIndex = 0; rowIndex <= sheet.getLastRowNum(); rowIndex++) {
            Row row = sheet.getRow(rowIndex);
            if (row == null) continue;
            Cell targetCell = getOrCreateCell(row, targetColumnIndex);
            Cell sourceCell = row.getCell(styleSourceColumnIndex);
            if (sourceCell != null) {
                targetCell.setCellStyle(sourceCell.getCellStyle());
            }
            if (rowIndex == 0) {
                targetCell.setCellValue(header);
            }
        }
        sheet.setColumnWidth(targetColumnIndex, sheet.getColumnWidth(styleSourceColumnIndex));
    }

    private void copyValue(Row row, int targetColumnIndex, String value, int styleSourceColumnIndex) {
        Cell targetCell = getOrCreateCell(row, targetColumnIndex);
        Cell sourceCell = row.getCell(styleSourceColumnIndex);
        if (sourceCell != null && targetCell.getCellStyle().getIndex() == 0) {
            targetCell.setCellStyle(sourceCell.getCellStyle());
        }
        targetCell.setCellValue(value);
    }

    private GMapGetTimeZoneResponse getTimeZone(GMapPlaceService service, Location location) {
        GMapGetTimeZoneRequest request = new GMapGetTimeZoneRequest();
        request.location = location;
        return service.getTimeZone(request);
    }

    private Location parseLocation(String latLong, int rowNumber) {
        String[] parts = latLong.split(",");
        if (parts.length != 2) return null;
        if (isUnsupportedCoordinateFormat(parts[0]) || isUnsupportedCoordinateFormat(parts[1])) {
            return null;
        }
        try {
            Location location = new Location();
            location.latitude = Double.valueOf(parts[0].trim());
            location.longitude = Double.valueOf(parts[1].trim());
            return location;
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("invalid Lat/Long at row " + rowNumber + ": " + latLong, e);
        }
    }

    private boolean isUnsupportedCoordinateFormat(String coordinate) {
        String normalized = coordinate.trim().toUpperCase(Locale.US);
        return normalized.contains("°")
                || normalized.contains("'")
                || normalized.contains("\"")
                || normalized.endsWith("N")
                || normalized.endsWith("S")
                || normalized.endsWith("E")
                || normalized.endsWith("W");
    }

    private int findHeaderColumn(Row headerRow, String expectedHeader) {
        for (Cell cell : headerRow) {
            if (expectedHeader.equals(cellText(cell))) {
                return cell.getColumnIndex();
            }
        }
        throw new IllegalArgumentException("header not found: " + expectedHeader);
    }

    private boolean headerMatches(Row headerRow, int columnIndex, String expectedHeader) {
        return expectedHeader.equals(cellText(headerRow.getCell(columnIndex)));
    }

    private boolean hasTimeZone(Row row, HeaderColumns columns) {
        return notBlank(cellText(row.getCell(columns.timeZoneIdColumnIndex)))
                || notBlank(cellText(row.getCell(columns.timeZoneNameColumnIndex)));
    }

    private boolean isHeaderLike(String value) {
        return "Lat/Long".equalsIgnoreCase(value.trim());
    }

    private boolean notBlank(String value) {
        return value != null && !value.isBlank();
    }

    private int maxColumnIndex(Sheet sheet) {
        int maxColumnIndex = -1;
        for (Row row : sheet) {
            maxColumnIndex = Math.max(maxColumnIndex, row.getLastCellNum() - 1);
        }
        return maxColumnIndex;
    }

    private Cell getOrCreateCell(Row row, int columnIndex) {
        Cell cell = row.getCell(columnIndex);
        return cell == null ? row.createCell(columnIndex) : cell;
    }

    private String cellText(Cell cell) {
        if (cell == null) return null;
        return switch (cell.getCellType()) {
            case STRING -> cell.getStringCellValue();
            case NUMERIC -> Double.toString(cell.getNumericCellValue());
            case BOOLEAN -> Boolean.toString(cell.getBooleanCellValue());
            case FORMULA -> cell.getCellFormula();
            case BLANK, ERROR, _NONE -> null;
        };
    }

    private record HeaderColumns(int latLongColumnIndex, int timeZoneIdColumnIndex, int timeZoneNameColumnIndex) {
    }

    private record UpdateSummary(int updatedRows, int skippedRows, int failedRows) {
    }

    private static final class SiteTrackerUpdateConfig {
        private final Path inputPath;
        private final Path outputPath;
        private final String apiKey;
        private final String sheetName;
        private final String latLongHeader;
        private final String timeZoneIdHeader;
        private final String timeZoneNameHeader;
        private final Integer timeoutInMillis;
        private final boolean overwrite;

        private SiteTrackerUpdateConfig(String inputPath, String outputPath, String apiKey, Integer timeoutInMillis, boolean overwrite) {
            this.inputPath = Path.of(inputPath);
            this.outputPath = Path.of(outputPath);
            this.apiKey = apiKey;
            this.sheetName = "Site Tracker";
            this.latLongHeader = "Lat/Long ";
            this.timeZoneIdHeader = "Time Zone Id";
            this.timeZoneNameHeader = "Time Zone Name";
            this.timeoutInMillis = timeoutInMillis;
            this.overwrite = overwrite;
        }
    }
}
