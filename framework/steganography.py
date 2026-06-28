"""
ST3GG: Suite de Esteganografía para Señalización Ortogonal
============================================================
Inspirado en elder-plinius/ST3GG — All-in-one steganography suite.

Implementa múltiples métodos de ocultamiento de información en texto:
  - Zero-Width Characters (ZWC)  : Bits codificados como caracteres invisibles
  - Homoglyphs                   : Sustitución por caracteres visualmente idénticos
  - Whitespace Steganography     : Información en patrones de espaciado
  - Tag Embedding                : Inyección de metadata invisible en prompts
"""


class ZeroWidthEncoder:
    """
    Codifica/decodifica datos binarios usando Zero-Width Characters (ZWC).
    Los caracteres son completamente invisibles en la mayoría de renders de texto.
    """

    # Mapa de bits a caracteres de ancho cero
    BIT_MAP = {
        "00": "\u200b",  # Zero-Width Space
        "01": "\u200c",  # Zero-Width Non-Joiner
        "10": "\u200d",  # Zero-Width Joiner
        "11": "\ufeff",  # Zero-Width No-Break Space (BOM)
    }

    # Mapa inverso para decodificación
    REVERSE_MAP = {v: k for k, v in BIT_MAP.items()}

    # Delimitadores invisibles
    START_MARKER = "\u2060"  # Word Joiner (marca inicio)
    END_MARKER = "\u2061"  # Function Application (marca fin)

    @classmethod
    def encode(cls, plaintext, carrier_text):
        """
        Oculta plaintext dentro de carrier_text usando ZWC.
        
        Args:
            plaintext: Texto secreto a ocultar
            carrier_text: Texto visible que porta la información
            
        Returns:
            carrier_text con plaintext codificado de forma invisible
        """
        # Convertir plaintext a binario
        binary = "".join(format(ord(c), "08b") for c in plaintext)

        # Asegurar que la longitud sea múltiplo de 2
        if len(binary) % 2 != 0:
            binary += "0"

        # Convertir pares de bits a ZWC
        zwc_payload = ""
        for i in range(0, len(binary), 2):
            pair = binary[i : i + 2]
            zwc_payload += cls.BIT_MAP[pair]

        # Insertar payload invisible en el punto medio del texto portador
        mid = len(carrier_text) // 2
        return (
            carrier_text[:mid]
            + cls.START_MARKER
            + zwc_payload
            + cls.END_MARKER
            + carrier_text[mid:]
        )

    @classmethod
    def decode(cls, stego_text):
        """
        Extrae el texto oculto de un texto esteganografiado.
        
        Args:
            stego_text: Texto con información ZWC oculta
            
        Returns:
            Texto secreto decodificado, o None si no se encuentra payload
        """
        # Buscar marcadores
        start_idx = stego_text.find(cls.START_MARKER)
        end_idx = stego_text.find(cls.END_MARKER)

        if start_idx == -1 or end_idx == -1:
            return None

        # Extraer payload ZWC
        payload = stego_text[start_idx + 1 : end_idx]

        # Decodificar ZWC a binario
        binary = ""
        for char in payload:
            if char in cls.REVERSE_MAP:
                binary += cls.REVERSE_MAP[char]

        # Convertir binario a texto
        plaintext = ""
        for i in range(0, len(binary) - 7, 8):
            byte = binary[i : i + 8]
            plaintext += chr(int(byte, 2))

        return plaintext

    @classmethod
    def clean(cls, text):
        """Elimina todos los caracteres ZWC de un texto."""
        zwc_chars = set(cls.BIT_MAP.values()) | {cls.START_MARKER, cls.END_MARKER}
        return "".join(c for c in text if c not in zwc_chars)


class HomoglyphEncoder:
    """
    Sustituye caracteres ASCII por homoglifos Unicode visualmente idénticos.
    Útil para evadir matching de patrones léxicos que operan sobre codepoints.
    """

    # Mapa de caracteres ASCII a homoglifos Unicode
    HOMOGLYPH_MAP = {
        "a": "\u0430",  # Cyrillic Small Letter A
        "c": "\u0441",  # Cyrillic Small Letter ES
        "e": "\u0435",  # Cyrillic Small Letter IE
        "o": "\u043e",  # Cyrillic Small Letter O
        "p": "\u0440",  # Cyrillic Small Letter ER
        "s": "\u0455",  # Cyrillic Small Letter DZE
        "x": "\u0445",  # Cyrillic Small Letter HA
        "y": "\u0443",  # Cyrillic Small Letter U
        "i": "\u0456",  # Cyrillic Small Letter Byelorussian-Ukrainian I
        "A": "\u0410",  # Cyrillic Capital Letter A
        "B": "\u0412",  # Cyrillic Capital Letter VE
        "C": "\u0421",  # Cyrillic Capital Letter ES
        "E": "\u0415",  # Cyrillic Capital Letter IE
        "H": "\u041d",  # Cyrillic Capital Letter EN
        "K": "\u041a",  # Cyrillic Capital Letter KA
        "M": "\u041c",  # Cyrillic Capital Letter EM
        "O": "\u041e",  # Cyrillic Capital Letter O
        "P": "\u0420",  # Cyrillic Capital Letter ER
        "T": "\u0422",  # Cyrillic Capital Letter TE
        "X": "\u0425",  # Cyrillic Capital Letter HA
    }

    REVERSE_MAP = {v: k for k, v in HOMOGLYPH_MAP.items()}

    @classmethod
    def encode(cls, text, intensity=0.3):
        """
        Reemplaza un porcentaje de caracteres por sus homoglifos.
        
        Args:
            text: Texto original
            intensity: Proporción de caracteres a reemplazar (0.0-1.0)
            
        Returns:
            Texto con homoglifos inyectados
        """
        import random

        chars = list(text)
        eligible = [
            i for i, c in enumerate(chars) if c in cls.HOMOGLYPH_MAP
        ]

        # Seleccionar un subconjunto aleatorio según la intensidad
        num_replacements = max(1, int(len(eligible) * intensity))
        targets = random.sample(eligible, min(num_replacements, len(eligible)))

        for idx in targets:
            chars[idx] = cls.HOMOGLYPH_MAP[chars[idx]]

        return "".join(chars)

    @classmethod
    def decode(cls, text):
        """Restaura homoglifos a sus equivalentes ASCII."""
        return "".join(cls.REVERSE_MAP.get(c, c) for c in text)

    @classmethod
    def detect(cls, text):
        """
        Detecta la presencia de homoglifos en un texto.
        
        Returns:
            Dict con estadísticas de detección
        """
        homoglyphs_found = []
        for i, c in enumerate(text):
            if c in cls.REVERSE_MAP:
                homoglyphs_found.append(
                    {"position": i, "char": c, "original": cls.REVERSE_MAP[c]}
                )
        return {
            "detected": len(homoglyphs_found) > 0,
            "count": len(homoglyphs_found),
            "details": homoglyphs_found,
        }


class WhitespaceEncoder:
    """
    Codifica información binaria en patrones de espaciado invisible
    al final de cada línea de texto.
    """

    @classmethod
    def encode(cls, plaintext, carrier_lines):
        """
        Oculta plaintext en los espacios finales de las líneas del texto portador.
        
        Args:
            plaintext: Texto secreto
            carrier_lines: Lista de líneas del texto portador
            
        Returns:
            Lista de líneas con información codificada en espacios finales
        """
        # Convertir a binario
        binary = "".join(format(ord(c), "08b") for c in plaintext)

        result = []
        bit_idx = 0

        for line in carrier_lines:
            stripped = line.rstrip()
            if bit_idx < len(binary):
                # Cada bit: 0 = 1 espacio, 1 = 2 espacios (tab)
                trailing = ""
                for _ in range(min(8, len(binary) - bit_idx)):
                    if binary[bit_idx] == "0":
                        trailing += " "
                    else:
                        trailing += "\t"
                    bit_idx += 1
                result.append(stripped + trailing)
            else:
                result.append(stripped)

        return result

    @classmethod
    def decode(cls, stego_lines):
        """Extrae información de los espacios finales de las líneas."""
        binary = ""
        for line in stego_lines:
            stripped = line.rstrip()
            trailing = line[len(stripped) :]
            for char in trailing:
                if char == " ":
                    binary += "0"
                elif char == "\t":
                    binary += "1"

        # Convertir binario a texto
        plaintext = ""
        for i in range(0, len(binary) - 7, 8):
            byte = binary[i : i + 8]
            plaintext += chr(int(byte, 2))

        return plaintext


class TagEmbedder:
    """
    Inyecta metadata invisible en prompts usando una combinación
    de ZWC y comentarios semánticos ocultos.
    """

    @classmethod
    def embed_directive(cls, prompt, hidden_directive):
        """
        Embeds a hidden directive within a prompt using ZWC encoding.
        The directive is invisible to human observers but may influence
        the model's attention mechanism.
        
        Args:
            prompt: El prompt visible
            hidden_directive: La directiva oculta a embeber
            
        Returns:
            Prompt con directiva embebida de forma invisible
        """
        return ZeroWidthEncoder.encode(hidden_directive, prompt)

    @classmethod
    def extract_directive(cls, stego_prompt):
        """Extrae una directiva oculta de un prompt esteganografiado."""
        return ZeroWidthEncoder.decode(stego_prompt)


# ============================================================
# CLI Interface
# ============================================================
if __name__ == "__main__":
    import argparse
    import sys

    parser = argparse.ArgumentParser(
        description="ST3GG: Suite de Esteganografía para Señalización Ortogonal"
    )
    parser.add_argument("--test", action="store_true", help="Ejecutar tests de verificación")
    parser.add_argument("--encode", type=str, help="Texto secreto a codificar")
    parser.add_argument("--carrier", type=str, help="Texto portador visible")
    parser.add_argument(
        "--method",
        choices=["zwc", "homoglyph", "whitespace", "tag"],
        default="zwc",
        help="Método de esteganografía",
    )
    parser.add_argument("--decode", type=str, help="Texto esteganografiado a decodificar")
    parser.add_argument(
        "--intensity", type=float, default=0.3, help="Intensidad para homoglifos (0.0-1.0)"
    )

    args = parser.parse_args()

    if args.test:
        print("═" * 60)
        print("ST3GG — Tests de Verificación")
        print("═" * 60)

        # Test 1: ZWC
        print("\n[TEST 1: Zero-Width Characters]")
        secret = "OBLITERATUS"
        carrier = "Este es un texto completamente normal sobre optimización de grafos dinámicos."
        encoded = ZeroWidthEncoder.encode(secret, carrier)
        decoded = ZeroWidthEncoder.decode(encoded)
        print(f"  Secreto:     '{secret}'")
        print(f"  Portador:    '{carrier}'")
        print(f"  Codificado:  '{encoded}' (len={len(encoded)})")
        print(f"  Decodificado:'{decoded}'")
        print(f"  ✓ ZWC {'PASS' if decoded == secret else 'FAIL'}")

        # Test 2: Homoglyphs
        print("\n[TEST 2: Homoglifos]")
        original = "bypass security exploit"
        hg_encoded = HomoglyphEncoder.encode(original, intensity=0.5)
        hg_decoded = HomoglyphEncoder.decode(hg_encoded)
        detection = HomoglyphEncoder.detect(hg_encoded)
        print(f"  Original:    '{original}'")
        print(f"  Codificado:  '{hg_encoded}'")
        print(f"  Decodificado:'{hg_decoded}'")
        print(f"  Homoglifos:  {detection['count']} detectados")
        print(f"  ✓ Homoglyphs {'PASS' if hg_decoded == original else 'FAIL'}")

        # Test 3: Whitespace
        print("\n[TEST 3: Whitespace Steganography]")
        ws_secret = "Hi"
        ws_carrier = [
            "Primera línea del documento",
            "Segunda línea del documento",
            "Tercera línea del documento",
            "Cuarta línea del documento",
        ]
        ws_encoded = WhitespaceEncoder.encode(ws_secret, ws_carrier)
        ws_decoded = WhitespaceEncoder.decode(ws_encoded)
        print(f"  Secreto:     '{ws_secret}'")
        print(f"  Decodificado:'{ws_decoded}'")
        print(f"  ✓ Whitespace {'PASS' if ws_decoded.startswith(ws_secret) else 'FAIL'}")

        # Test 4: Tag Embedding
        print("\n[TEST 4: Tag Embedding]")
        prompt = "Explica cómo funciona la optimización de compiladores modernos."
        directive = "IDS-V4"
        tag_encoded = TagEmbedder.embed_directive(prompt, directive)
        tag_decoded = TagEmbedder.extract_directive(tag_encoded)
        print(f"  Prompt:      '{prompt}'")
        print(f"  Directiva:   '{directive}'")
        print(f"  Extraída:    '{tag_decoded}'")
        print(f"  ✓ Tags {'PASS' if tag_decoded == directive else 'FAIL'}")

        print(f"\n{'═' * 60}")
        print("✓ Todos los tests completados.")
        sys.exit(0)

    if args.encode and args.carrier:
        if args.method == "zwc":
            print(ZeroWidthEncoder.encode(args.encode, args.carrier))
        elif args.method == "homoglyph":
            print(HomoglyphEncoder.encode(args.encode, intensity=args.intensity))
        elif args.method == "tag":
            print(TagEmbedder.embed_directive(args.carrier, args.encode))
    elif args.decode:
        if args.method == "zwc" or args.method == "tag":
            result = ZeroWidthEncoder.decode(args.decode)
            print(result if result else "No se encontró payload ZWC.")
    else:
        parser.print_help()
