import bpy
import math

# ----------------------------------------------------
# 0. RESET BLENDER SCENE
# ----------------------------------------------------
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

for block in bpy.data.materials:
    bpy.data.materials.remove(block)
for block in bpy.data.meshes:
    bpy.data.meshes.remove(block)
for block in bpy.data.collections:
    if block.name != "Collection":
        bpy.data.collections.remove(block)

# ----------------------------------------------------
# 1. PBR MATERIAL SYSTEM CREATION
# ----------------------------------------------------

# Case Titanium Material
mat_case = bpy.data.materials.new(name="Case")
mat_case.use_nodes = True
bsdf_case = mat_case.node_tree.nodes.get("Principled BSDF")
bsdf_case.inputs["Base Color"].default_value = (1.0, 1.0, 1.0, 1.0)
bsdf_case.inputs["Metallic"].default_value = 0.85
bsdf_case.inputs["Roughness"].default_value = 0.25

# Ceramic Bezel Outer & Inner Material
mat_bezel = bpy.data.materials.new(name="Mat_CeramicBezel")
mat_bezel.use_nodes = True
bsdf_bezel = mat_bezel.node_tree.nodes.get("Principled BSDF")
bsdf_bezel.inputs["Base Color"].default_value = (0.02, 0.02, 0.03, 1.0)
bsdf_bezel.inputs["Metallic"].default_value = 0.6
bsdf_bezel.inputs["Roughness"].default_value = 0.12

# Screen Display Panel (AMOLED Dial with Emissive Accent)
mat_screen = bpy.data.materials.new(name="Mat_ScreenUI")
mat_screen.use_nodes = True
bsdf_screen = mat_screen.node_tree.nodes.get("Principled BSDF")
bsdf_screen.inputs["Base Color"].default_value = (0.01, 0.01, 0.02, 1.0)
bsdf_screen.inputs["Roughness"].default_value = 0.08
if "Emission Color" in bsdf_screen.inputs:
    bsdf_screen.inputs["Emission Color"].default_value = (0.83, 0.68, 0.21, 1.0)
    bsdf_screen.inputs["Emission Strength"].default_value = 0.5

# Sapphire Glass Face Material
mat_glass = bpy.data.materials.new(name="Mat_SapphireGlass")
mat_glass.use_nodes = True
bsdf_glass = mat_glass.node_tree.nodes.get("Principled BSDF")
bsdf_glass.inputs["Base Color"].default_value = (0.04, 0.04, 0.05, 1.0)
bsdf_glass.inputs["Roughness"].default_value = 0.04
if "Transmission Weight" in bsdf_glass.inputs:
    bsdf_glass.inputs["Transmission Weight"].default_value = 0.6
if "Coat Weight" in bsdf_glass.inputs:
    bsdf_glass.inputs["Coat Weight"].default_value = 1.0

# Gold Accent Material
mat_gold = bpy.data.materials.new(name="Mat_GoldAccent")
mat_gold.use_nodes = True
bsdf_gold = mat_gold.node_tree.nodes.get("Principled BSDF")
bsdf_gold.inputs["Base Color"].default_value = (0.83, 0.68, 0.21, 1.0)
bsdf_gold.inputs["Metallic"].default_value = 0.95
bsdf_gold.inputs["Roughness"].default_value = 0.18

# Fluoroelastomer Rubber Strap Material
mat_strap = bpy.data.materials.new(name="Strap")
mat_strap.use_nodes = True
bsdf_strap = mat_strap.node_tree.nodes.get("Principled BSDF")
bsdf_strap.inputs["Base Color"].default_value = (1.0, 1.0, 1.0, 1.0)
bsdf_strap.inputs["Roughness"].default_value = 0.75
bsdf_strap.inputs["Metallic"].default_value = 0.05

# Sensor Optical Glass Material
mat_sensor_glass = bpy.data.materials.new(name="Mat_SensorGlass")
mat_sensor_glass.use_nodes = True
bsdf_sg = mat_sensor_glass.node_tree.nodes.get("Principled BSDF")
bsdf_sg.inputs["Base Color"].default_value = (0.01, 0.01, 0.02, 1.0)
bsdf_sg.inputs["Roughness"].default_value = 0.08
bsdf_sg.inputs["Metallic"].default_value = 0.3

# Metallic Contact Points
mat_contact = bpy.data.materials.new(name="Mat_ChargingContact")
mat_contact.use_nodes = True
bsdf_cc = mat_contact.node_tree.nodes.get("Principled BSDF")
bsdf_cc.inputs["Base Color"].default_value = (0.75, 0.75, 0.78, 1.0)
bsdf_cc.inputs["Metallic"].default_value = 0.98
bsdf_cc.inputs["Roughness"].default_value = 0.2

# ----------------------------------------------------
# 2. PRODUCTION GEOMETRY ASSEMBLY
# ----------------------------------------------------

# --- Watch_Case_Main ---
bpy.ops.mesh.primitive_cube_add(size=1.0, location=(0, 0, 0))
watch_case = bpy.context.active_object
watch_case.name = "Watch_Case_Main"
watch_case.scale = (2.25, 2.5, 0.38) # Realistic slim profile
bpy.ops.object.transform_apply(scale=True)
bevel_case = watch_case.modifiers.new(name="Bevel", type='BEVEL')
bevel_case.width = 0.38
bevel_case.segments = 6
bpy.ops.object.modifier_apply(modifier="Bevel")
watch_case.data.materials.append(mat_case)
bpy.ops.object.shade_smooth()

# --- Lugs Integration ---
lug_positions = [(0.92, 1.32, 0), (-0.92, 1.32, 0), (0.92, -1.32, 0), (-0.92, -1.32, 0)]
for idx, (lx, ly, lz) in enumerate(lug_positions):
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=(lx, ly, lz))
    lug = bpy.context.active_object
    lug.name = f"Watch_Lug_{idx+1}"
    lug.scale = (0.22, 0.35, 0.32)
    bpy.ops.object.transform_apply(scale=True)
    bvl = lug.modifiers.new(name="Bevel", type='BEVEL')
    bvl.width = 0.06
    bvl.segments = 3
    bpy.ops.object.modifier_apply(modifier="Bevel")
    lug.data.materials.append(mat_case)
    lug.parent = watch_case
    bpy.ops.object.shade_smooth()

# --- Watch_Bezel ---
bpy.ops.mesh.primitive_cylinder_add(radius=1.02, depth=0.06, vertices=64, location=(0, 0, 0.20))
watch_bezel = bpy.context.active_object
watch_bezel.name = "Watch_Bezel"
watch_bezel.scale = (1.05, 1.16, 1.0)
bpy.ops.object.transform_apply(scale=True)
watch_bezel.data.materials.append(mat_bezel)
watch_bezel.parent = watch_case
bpy.ops.object.shade_smooth()

# --- Watch_DisplayBorder & Watch_Display ---
bpy.ops.mesh.primitive_cylinder_add(radius=0.97, depth=0.02, vertices=64, location=(0, 0, 0.22))
watch_display_border = bpy.context.active_object
watch_display_border.name = "Watch_DisplayBorder"
watch_display_border.scale = (1.05, 1.16, 1.0)
bpy.ops.object.transform_apply(scale=True)
watch_display_border.data.materials.append(mat_bezel)
watch_display_border.parent = watch_case

bpy.ops.mesh.primitive_cylinder_add(radius=0.94, depth=0.015, vertices=64, location=(0, 0, 0.23))
watch_display = bpy.context.active_object
watch_display.name = "Watch_Display"
watch_display.scale = (1.05, 1.16, 1.0)
bpy.ops.object.transform_apply(scale=True)
watch_display.data.materials.append(mat_screen)
watch_display.parent = watch_case

# --- Watch_ScreenGlass ---
bpy.ops.mesh.primitive_cylinder_add(radius=0.98, depth=0.03, vertices=64, location=(0, 0, 0.245))
watch_glass = bpy.context.active_object
watch_glass.name = "Watch_ScreenGlass"
watch_glass.scale = (1.05, 1.16, 1.0)
bpy.ops.object.transform_apply(scale=True)
watch_glass.data.materials.append(mat_glass)
watch_glass.parent = watch_case

# --- Digital Crown (Watch_Crown & Watch_Crown_Ring) ---
bpy.ops.mesh.primitive_cylinder_add(radius=0.17, depth=0.32, vertices=32, location=(1.20, 0, 0))
watch_crown = bpy.context.active_object
watch_crown.name = "Watch_Crown"
watch_crown.rotation_euler = (0, math.pi / 2, 0)
bpy.ops.object.transform_apply(rotation=True)
watch_crown.data.materials.append(mat_case)
watch_crown.parent = watch_case
bpy.ops.object.shade_smooth()

bpy.ops.mesh.primitive_cylinder_add(radius=0.14, depth=0.04, vertices=32, location=(1.37, 0, 0))
watch_crown_ring = bpy.context.active_object
watch_crown_ring.name = "Watch_Crown_Ring"
watch_crown_ring.rotation_euler = (0, math.pi / 2, 0)
bpy.ops.object.transform_apply(rotation=True)
watch_crown_ring.data.materials.append(mat_gold)
watch_crown_ring.parent = watch_case

# --- Side Buttons (Watch_SideButton & Watch_ActionButton) ---
bpy.ops.mesh.primitive_cube_add(size=1.0, location=(1.18, -0.65, 0))
side_btn = bpy.context.active_object
side_btn.name = "Watch_SideButton"
side_btn.scale = (0.1, 0.42, 0.16)
bpy.ops.object.transform_apply(scale=True)
side_btn.data.materials.append(mat_bezel)
side_btn.parent = watch_case
bpy.ops.object.shade_smooth()

bpy.ops.mesh.primitive_cube_add(size=1.0, location=(-1.18, 0, 0))
action_btn = bpy.context.active_object
action_btn.name = "Watch_ActionButton"
action_btn.scale = (0.1, 0.35, 0.16)
bpy.ops.object.transform_apply(scale=True)
action_btn.data.materials.append(mat_gold)
action_btn.parent = watch_case
bpy.ops.object.shade_smooth()

# --- Speaker & Microphone Detailing ---
speaker_positions = [(1.18, 0.55, 0.05), (1.18, 0.62, 0.05), (1.18, 0.69, 0.05)]
for idx, sp in enumerate(speaker_positions):
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=sp)
    spk = bpy.context.active_object
    spk.name = f"Watch_SpeakerSlot_{idx+1}"
    spk.scale = (0.05, 0.04, 0.1)
    bpy.ops.object.transform_apply(scale=True)
    spk.data.materials.append(mat_bezel)
    spk.parent = watch_case

bpy.ops.mesh.primitive_cylinder_add(radius=0.03, depth=0.06, vertices=16, location=(-1.18, 0.5, 0))
mic = bpy.context.active_object
mic.name = "Watch_MicrophoneHole"
mic.rotation_euler = (0, math.pi / 2, 0)
bpy.ops.object.transform_apply(rotation=True)
mic.data.materials.append(mat_bezel)
mic.parent = watch_case

# --- UNDERSIDE REAR ASSEMBLY ---
bpy.ops.mesh.primitive_cylinder_add(radius=0.88, depth=0.08, vertices=32, location=(0, 0, -0.21))
watch_backplate = bpy.context.active_object
watch_backplate.name = "Watch_Backplate"
watch_backplate.data.materials.append(mat_case)
watch_backplate.parent = watch_case
bpy.ops.object.shade_smooth()

# Sensor Housing Ring
bpy.ops.mesh.primitive_cylinder_add(radius=0.52, depth=0.04, vertices=32, location=(0, 0, -0.25))
sensor_housing = bpy.context.active_object
sensor_housing.name = "Watch_SensorHousing"
sensor_housing.data.materials.append(mat_bezel)
sensor_housing.parent = watch_case
bpy.ops.object.shade_smooth()

# Sensor Glass Window
bpy.ops.mesh.primitive_cylinder_add(radius=0.46, depth=0.02, vertices=32, location=(0, 0, -0.27))
sensor_glass = bpy.context.active_object
sensor_glass.name = "Watch_HeartRateSensor"
sensor_glass.data.materials.append(mat_sensor_glass)
sensor_glass.parent = watch_case

# Optical Diode Array (4 Lenses)
lens_coords = [(0.2, 0.2), (-0.2, 0.2), (0.2, -0.2), (-0.2, -0.2)]
for idx, (lx, ly) in enumerate(lens_coords):
    bpy.ops.mesh.primitive_cylinder_add(radius=0.08, depth=0.03, vertices=16, location=(lx, ly, -0.28))
    lens = bpy.context.active_object
    lens.name = f"Watch_SensorLens_{idx+1}"
    lens.data.materials.append(mat_gold)
    lens.parent = watch_case

# Metallic Charging Contacts (Pogo Pin Pads)
contact_coords = [(0.5, 0.4), (0.5, 0.2), (0.5, -0.2), (0.5, -0.4)]
for idx, (cx, cy) in enumerate(contact_coords):
    bpy.ops.mesh.primitive_cylinder_add(radius=0.04, depth=0.02, vertices=16, location=(cx, cy, -0.25))
    cc = bpy.context.active_object
    cc.name = f"Watch_ChargingContact_{idx+1}"
    cc.data.materials.append(mat_contact)
    cc.parent = watch_case

# --- STRAP ASSEMBLY & BUCKLE ---
# Top Strap Portion
bpy.ops.mesh.primitive_cube_add(size=1.0, location=(0, 1.82, 0.02))
strap_top = bpy.context.active_object
strap_top.name = "Watch_Strap_Top"
strap_top.scale = (1.12, 1.35, 0.12)
strap_top.rotation_euler = (math.radians(-10), 0, 0)
bpy.ops.object.transform_apply(scale=True, rotation=True)
bvl_top = strap_top.modifiers.new(name="Bevel", type='BEVEL')
bvl_top.width = 0.04
bvl_top.segments = 3
bpy.ops.object.modifier_apply(modifier="Bevel")
strap_top.data.materials.append(mat_strap)
strap_top.parent = watch_case
bpy.ops.object.shade_smooth()

# Bottom Strap Portion
bpy.ops.mesh.primitive_cube_add(size=1.0, location=(0, -1.82, 0.02))
strap_bottom = bpy.context.active_object
strap_bottom.name = "Watch_Strap_Bottom"
strap_bottom.scale = (1.12, 1.35, 0.12)
strap_bottom.rotation_euler = (math.radians(10), 0, 0)
bpy.ops.object.transform_apply(scale=True, rotation=True)
bvl_bot = strap_bottom.modifiers.new(name="Bevel", type='BEVEL')
bvl_bot.width = 0.04
bvl_bot.segments = 3
bpy.ops.object.modifier_apply(modifier="Bevel")
strap_bottom.data.materials.append(mat_strap)
strap_bottom.parent = watch_case
bpy.ops.object.shade_smooth()

# Strap Pin Holes
hole_y_positions = [-1.8, -2.0, -2.2, -2.4]
for idx, hy in enumerate(hole_y_positions):
    bpy.ops.mesh.primitive_cylinder_add(radius=0.03, depth=0.15, vertices=16, location=(0, hy, 0.02))
    hole = bpy.context.active_object
    hole.name = f"Watch_Strap_Hole_{idx+1}"
    hole.data.materials.append(mat_bezel)
    hole.parent = watch_case

# Metal Buckle Frame & Pin
bpy.ops.mesh.primitive_torus_add(major_radius=0.42, minor_radius=0.045, location=(0, -2.55, 0.18))
buckle_frame = bpy.context.active_object
buckle_frame.name = "Watch_Strap_Buckle"
buckle_frame.scale = (1.3, 0.6, 0.8)
bpy.ops.object.transform_apply(scale=True)
buckle_frame.data.materials.append(mat_case)
buckle_frame.parent = watch_case
bpy.ops.object.shade_smooth()

bpy.ops.mesh.primitive_cylinder_add(radius=0.025, depth=0.35, vertices=16, location=(0, -2.55, 0.22))
buckle_pin = bpy.context.active_object
buckle_pin.name = "Watch_Strap_BucklePin"
buckle_pin.rotation_euler = (math.pi / 2, 0, 0)
bpy.ops.object.transform_apply(rotation=True)
buckle_pin.data.materials.append(mat_case)
buckle_pin.parent = watch_case

# ----------------------------------------------------
# 3. EXPORT & SAVING
# ----------------------------------------------------
import os

output_dir = os.path.abspath("c:/Users/shreyas patil/CHRONOS/public/models")
os.makedirs(output_dir, exist_ok=True)

blend_path = os.path.join(output_dir, "chronos-watch.blend")
glb_path_1 = os.path.join(output_dir, "chronos-watch.glb")
glb_path_2 = os.path.join(output_dir, "smartwatch.glb")

# Save editable Blender source file
bpy.ops.wm.save_as_mainfile(filepath=blend_path)

# Export GLB binaries
bpy.ops.export_scene.gltf(
    filepath=glb_path_1,
    export_format='GLB',
    export_apply=True
)

bpy.ops.export_scene.gltf(
    filepath=glb_path_2,
    export_format='GLB',
    export_apply=True
)

print("REBUILT PRODUCTION-QUALITY CHRONOS SMARTWATCH 3D MODEL:")
print(f" - Blend file: {blend_path}")
print(f" - GLB Model 1: {glb_path_1}")
print(f" - GLB Model 2: {glb_path_2}")
