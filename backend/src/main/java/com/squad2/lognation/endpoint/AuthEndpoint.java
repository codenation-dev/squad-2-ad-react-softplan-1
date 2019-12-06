package com.squad2.lognation.endpoint;

import com.squad2.lognation.core.security.JwtAuthenticationResponse;
import com.squad2.lognation.core.security.JwtTokenProvider;
import com.squad2.lognation.endpoint.dto.LoginRequestDto;
import com.squad2.lognation.endpoint.dto.SignupRequestDto;
import com.squad2.lognation.model.User;
import com.squad2.lognation.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api/auth")
public class AuthEndpoint {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private UserService userService;

    @PostMapping("/checkEmailAvailability")
    public ResponseEntity<Void> checkEmailAvailability(@RequestParam(value="email", defaultValue="", required=true) String email) {
        userService.checkEmailAvailability(email);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/forgotPassword")
    public ResponseEntity<Void> forgotPassword(@RequestParam(value="email", defaultValue="", required=true) String email) {
        userService.forgotPassword(email);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthenticationResponse> loginUser(@Valid @RequestBody LoginRequestDto loginRequestDto) {
        Authentication authentication = authenticationManager.authenticate(loginRequestDto.toCredentials());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(loginRequestDto.getEmail());
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity<Void> signupUser(@Valid @RequestBody SignupRequestDto signUpRequest) {
        User user = userService.Signup(signUpRequest.toUser());
        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(user.getId())
                .toUri();
        return ResponseEntity.created(uri).build();
    }

}
