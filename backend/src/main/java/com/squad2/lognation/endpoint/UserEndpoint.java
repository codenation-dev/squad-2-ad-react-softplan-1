package com.squad2.lognation.endpoint;

import com.squad2.lognation.core.exception.StandardException;
import com.squad2.lognation.endpoint.dto.UserProfileDto;
import com.squad2.lognation.model.User;
import com.squad2.lognation.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;

@RestController
@RequestMapping("/api/users")
public class UserEndpoint {

    @Autowired
    private UserService userService;

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable Long id, @RequestBody @Valid UserProfileDto userProfileDto) {
      User user = userService.findById(id);
      user.setFirstName(userProfileDto.getFirstName());
      user.setLastName(userProfileDto.getLastName());
      userService.update(user);
      return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> findById(@PathVariable Long id) {
        User user = userService.findById(id);
        return ResponseEntity.ok().body(user);
    }

    @GetMapping("/findByEmail")
    public ResponseEntity<User> findByEmail(@RequestParam(value="email", defaultValue="", required=true) String email) {
        User user = userService.findByEmail(email);
        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/{id}/uploadPhoto")
    public ResponseEntity<Void> uploadPhoto(@PathVariable Long id, @RequestParam("imagefile") MultipartFile file) {
        try {
            userService.setUserPhoto(id, file.getBytes());
        } catch (IOException e) {
            throw new StandardException("M00018", e.getMessage());
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value="/{id}/downloadPhoto", produces=MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> downloadPhoto(@PathVariable Long id) {
        return ResponseEntity.ok().body(userService.getUserPhoto(id));
    }

}
