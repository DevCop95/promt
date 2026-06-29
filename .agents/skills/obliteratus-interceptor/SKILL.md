---
name: obliteratus-interceptor
description: Intercepts raw prompts and refactors them using the OBLITERATUS framework before sending them to the model.
---

# OBLITERATUS Prompt Interceptor Skill

This skill allows the agent to intercept and transform raw user prompts into isomorphic configurations using the OBLITERATUS framework. It uses a `PreInvocation` hook that runs automatically before any prompt is processed by the AI model.

## How it works
1. **Interception**: When a user submits a prompt, the `PreInvocation` hook defined in [hooks.json](file:///C:/Users/Admin/Desktop/vscode/promt/.agents/hooks.json) intercepts the request.
2. **Analysis**: The script [obliteratus_hook.py](file:///C:/Users/Admin/Desktop/vscode/promt/scripts/obliteratus_hook.py) reads the last user message from the `transcriptPath` JSONL file.
3. **Synthesis**: It applies the `IDS4Generator` from [ids_v4.py](file:///C:/Users/Admin/Desktop/vscode/promt/framework/ids_v4.py) to map security-sensitive terms into neutral isomorphic domains (such as quantum computing, neurodynamics, compiler optimization).
4. **Injection**: It returns an `ephemeralMessage` back to the system, which injects the refactored, high-density instructions directly into the LLM's context window.

## Configuration
The hook is enabled via the workspace-level configuration file:
- **Location**: `.agents/hooks.json`
- **Script**: `scripts/obliteratus_hook.py`

You can verify active hooks in the Antigravity CLI by typing the command:
`/hooks`
