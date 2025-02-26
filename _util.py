from contextlib import contextmanager
from pathlib import Path
from subprocess import PIPE, run


class Cmd:
    base_cmd = ""

    @classmethod
    def run(cls, *cmd, allow_failure: bool = False, pipe: bool = True) -> str:
        cmd = [cls.base_cmd, *cmd]
        print_input(" ".join(cmd))

        if pipe:
            stdout = PIPE
            stderr = PIPE
        else:
            stdout = None
            stderr = None

        process = run(cmd, stdout=stdout, stderr=stderr)
        if not allow_failure and process.returncode != 0:
            raise ValueError(process.stderr.decode("utf8"))

        if pipe:
            result = process.stdout.decode("utf8")
            return result.strip()

        return ""


class Dfx(Cmd):
    base_cmd = "dfx"

    @classmethod
    def start(cls):
        cls.run("start", "--background", allow_failure=True, pipe=False)

    @classmethod
    def stop(cls):
        cls.run("stop", allow_failure=True, pipe=False)

    @classmethod
    def get_canister_id(cls, name: str) -> str:
        return cls.run("canister", "id", name)

    @classmethod
    def create_canister(cls, name: str):
        cmd = ["canister", "create"]
        if name:
            cmd.append(name)

        cls.run(*cmd)

    @classmethod
    def build(cls):
        cls.run("build")

    @classmethod
    def get_identities(cls) -> list[str]:
        output = cls.run("identity", "list")
        return output.splitlines()

    @classmethod
    def get_principal(cls, identity: str | None) -> str:
        cmd = ["identity", "get-principal"]
        if identity:
            cmd.extend(("--identity", identity))

        return cls.run(*cmd)

    @classmethod
    def create_identity(cls, name: str):
        cls.run("identity", "new", "--disable-encryption", name)

    @classmethod
    def deploy(cls, name: str, argument: str | None = None):
        cmd = ["deploy", name, "--yes"]
        if argument:
            cmd.extend(("--argument", argument))

        cls.run(*cmd)

    @classmethod
    def call(
        cls, canister_name: str, method_name: str, arguments: str | None = None
    ) -> str:
        arguments = arguments or "()"
        if not arguments.startswith("("):
            arguments = f"({arguments})"

        return cls.run("canister", "call", canister_name, method_name, arguments)


@contextmanager
def dfx_network_context():
    Dfx.start()
    try:
        yield
    finally:
        Dfx.stop()


def dfx_local_network(func):
    def fn():
        with dfx_network_context():
            return func()

    return fn


def print_input(msg: str):
    print(f"Input: {msg}")


def print_output(msg: str):
    print(f"Output: {msg}")


def make_record(data: str, suffix: str = ";") -> str:
    return f"record {{ {data} }}{suffix}"


def dict_to_record(data: dict, **kwargs) -> str:
    builder = ""
    for key, value in data.items():
        item = f"{key} = {value};"
        builder += f"{item} "

    return make_record(builder, **kwargs)


class CandidExtractor(Cmd):
    base_cmd = "candid-extractor"

    @classmethod
    def extract(cls, canister_name: str):
        wasm_path = f"target/wasm32-unknown-unknown/release/{canister_name}.wasm"
        content = cls.run(wasm_path)
        dst = (
            Path(__file__).parent
            / "src"
            / canister_name
            / "src"
            / f"{canister_name}.did"
        )
        if dst.is_file():
            existing_content = dst.read_text()
            if existing_content == content:
                return

        dst.unlink(missing_ok=True)
        dst.write_text(content)
