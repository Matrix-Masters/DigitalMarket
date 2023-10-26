package org.dsi.controller;
import org.dsi.service.FileService;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FileController {

    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @GetMapping("/products/images/{fileName:.+}")
    public ResponseEntity<Resource> serveFile(@PathVariable String fileName) {
        try {
            Resource file = fileService.loadFileAsResource(fileName);
            return ResponseEntity.ok().body(file);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}

