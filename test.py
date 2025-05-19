import pygame
import sys
import random
import time
import os
from pygame import gfxdraw

# Initialisierung
pygame.init()
width, height = 1024, 768
screen = pygame.display.set_mode((width, height))
pygame.display.set_caption("🔥 PYTHON OS - KRASSES CUSTOM OS 🔥")

# Farben
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
GREEN = (0, 255, 0)
RED = (255, 0, 0)
BLUE = (0, 100, 255)
CYAN = (0, 255, 255)

# Schriftarten
font_large = pygame.font.SysFont("consolas", 50)
font_medium = pygame.font.SysFont("consolas", 30)
font_small = pygame.font.SysFont("consolas", 20)

# Login-Daten (FAKE - Nur für die Simulation)
fake_user = "admin"
fake_pass = "1337"

# 3D-Punkte für Hintergrund (Matrix-Effekt)
points = []
for _ in range(100):
    x = random.randint(0, width)
    y = random.randint(0, height)
    speed = random.uniform(0.5, 2.0)
    points.append([x, y, speed])

def draw_matrix_effect():
    for point in points:
        y_pos = point[1]
        y_pos += point[2]
        if y_pos > height:
            y_pos = 0
            point[0] = random.randint(0, width)
        point[1] = y_pos
        alpha = random.randint(50, 150)
        color = (0, random.randint(100, 255), 0, alpha)
        gfxdraw.filled_circle(screen, int(point[0]), int(y_pos), 1, color)

def login_screen():
    user_text = ""
    pass_text = ""
    input_active = "user"
    login_success = False

    while not login_success:
        screen.fill(BLACK)
        draw_matrix_effect()

        title = font_large.render("PYTHON OS LOGIN", True, CYAN)
        screen.blit(title, (width // 2 - title.get_width() // 2, 100))

        user_label = font_medium.render("USERNAME:", True, WHITE)
        screen.blit(user_label, (width // 2 - 200, 300))

        pass_label = font_medium.render("PASSWORD:", True, WHITE)
        screen.blit(pass_label, (width // 2 - 200, 400))

        # Eingabefelder
        pygame.draw.rect(screen, BLUE if input_active == "user" else WHITE, (width // 2, 300, 300, 40), 2)
        pygame.draw.rect(screen, BLUE if input_active == "pass" else WHITE, (width // 2, 400, 300, 40), 2)

        user_surface = font_medium.render(user_text, True, WHITE)
        pass_surface = font_medium.render("*" * len(pass_text), True, WHITE)

        screen.blit(user_surface, (width // 2 + 10, 305))
        screen.blit(pass_surface, (width // 2 + 10, 405))

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            if event.type == pygame.MOUSEBUTTONDOWN:
                if width // 2 <= event.pos[0] <= width // 2 + 300:
                    if 300 <= event.pos[1] <= 340:
                        input_active = "user"
                    elif 400 <= event.pos[1] <= 440:
                        input_active = "pass"
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_RETURN:
                    if user_text == fake_user and pass_text == fake_pass:
                        login_success = True
                    else:
                        error_msg = font_medium.render("ACCESS DENIED!", True, RED)
                        screen.blit(error_msg, (width // 2 - error_msg.get_width() // 2, 500))
                        pygame.display.flip()
                        time.sleep(1)
                elif event.key == pygame.K_TAB:
                    input_active = "pass" if input_active == "user" else "user"
                elif event.key == pygame.K_BACKSPACE:
                    if input_active == "user":
                        user_text = user_text[:-1]
                    else:
                        pass_text = pass_text[:-1]
                else:
                    if input_active == "user":
                        user_text += event.unicode
                    else:
                        pass_text += event.unicode

        pygame.display.flip()

def main_os():
    running = True
    terminal_text = ["PYTHON OS v1.0 - TYPE 'help' FOR COMMANDS", ""]
    input_text = ""
    input_active = False

    while running:
        screen.fill(BLACK)
        draw_matrix_effect()

        # Desktop-Icons
        desktop_text = font_medium.render("DESKTOP (ICONS SIMULATED)", True, WHITE)
        screen.blit(desktop_text, (50, 50))

        # Terminal-Fenster
        pygame.draw.rect(screen, (30, 30, 30), (100, 150, width - 200, height - 300))
        pygame.draw.rect(screen, BLUE, (100, 150, width - 200, height - 300), 2)

        for i, line in enumerate(terminal_text[-10:]):
            text_surface = font_small.render(line, True, GREEN)
            screen.blit(text_surface, (110, 160 + i * 25))

        input_surface = font_small.render(f"> {input_text}", True, CYAN)
        screen.blit(input_surface, (110, height - 150))

        # Event-Handling
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_RETURN:
                    if input_text.strip() == "help":
                        terminal_text.append("> help")
                        terminal_text.append("COMMANDS: hack, sysinfo, exit, matrix")
                    elif input_text.strip() == "hack":
                        terminal_text.append("> hack")
                        terminal_text.append("INITIATING FAKE HACK...")
                        for _ in range(5):
                            terminal_text.append("".join(random.choices("01!@#$%&*", k=30)))
                    elif input_text.strip() == "sysinfo":
                        terminal_text.append("> sysinfo")
                        terminal_text.append(f"CPU: FAKE {random.randint(10, 100)}%")
                        terminal_text.append(f"RAM: {random.randint(1, 16)}GB USED")
                    elif input_text.strip() == "matrix":
                        terminal_text.append("> matrix")
                        terminal_text.append("ENTERING MATRIX... (SIMULATION)")
                    elif input_text.strip() == "exit":
                        running = False
                    else:
                        terminal_text.append(f"> {input_text}")
                        terminal_text.append(f"ERROR: UNKNOWN COMMAND")
                    input_text = ""
                elif event.key == pygame.K_BACKSPACE:
                    input_text = input_text[:-1]
                else:
                    input_text += event.unicode

        pygame.display.flip()

# Starte das OS
login_screen()
main_os()
pygame.quit()